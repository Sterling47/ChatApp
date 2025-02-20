import prisma from '@/lib/db';
import { hashPassword } from '@/components/Password';
import { NextRequest, NextResponse } from 'next/server';
import { csrfProtectionMiddleware } from '@/lib/auth/csrf';

export async function POST(req: NextRequest, resp: NextResponse) {
  try {
    const secret = process.env.JWT_KEY!
    await csrfProtectionMiddleware(req, resp, secret);
    const body = await req.json()
    const { newEmail, newUsername, newPassword, userEmail} = body.updateBody;
    const updateData: {
      email?: string;
      username?: string;
      password?: string;
    } = {};

    if (newEmail && newEmail !== userEmail) {
      const existingUser = await prisma.user.findUnique({
        where: { email: newEmail },
      });
      if (existingUser) {
        return NextResponse.json({ success: false, error: 'Email already in use' });
      }
      updateData.email = newEmail;
    }

    if (newUsername) {
      updateData.username = newUsername;
    }

    if (newPassword) {
      const hashedPassword = await hashPassword(newPassword);
      updateData.password = hashedPassword;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ success: false, error: 'No changes to update' });
    }

    const updatedUser = await prisma.user.update({
      where: { email: userEmail },
      data: updateData,
    });

    return NextResponse.json({ success: true, message: 'Profile updated successfully' });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ success: false, error: err.message });
    }
    return NextResponse.json({ success: false, error: 'Failed to update profile' });
  }
}