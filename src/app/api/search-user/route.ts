import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getUser } from '@/lib/auth/user';
import { getSession } from '@/lib/auth/session';
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  try {
    const user = await getUser();
    const secret = process.env.JWT_SECRET!
    if (!user || !user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const authToken = request.cookies.get('auth')?.value
    const session = await getSession(authToken, secret)
    if (!session) {
      return NextResponse.json(
        { message: 'Invalid or expired session' },
        { status: 401 }
      )
    }
    const currentUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const users = await prisma.user.findMany({
      where: {
        AND: [
          query
            ? {
              OR: [
                { username: { contains: query, mode: 'insensitive' } },
                { email: { contains: query, mode: 'insensitive' } },
              ],
            }
            : {},
          { id: { not: currentUser.id } },
          { isGuest: false }
        ],
      },
      select: {
        id: true,
        username: true,
        email: true,
        isOnline: true,
      },
    });

    return NextResponse.json({ users });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
