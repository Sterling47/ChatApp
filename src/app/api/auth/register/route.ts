import { hash } from 'argon2';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import rateLimit from 'next-rate-limit';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 8;

const limiter = rateLimit({
  interval: 15 * 60 * 1000,
  uniqueTokenPerInterval: 100
});

export async function POST(
  req: NextRequest
) {
  try {
    const headers = limiter.checkNext(req, 25);
    const body = await req.json();
    const { email, password, username } = body;

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email address' },
        { status: 400, headers }
      );
    }

    if (!password || password.length < PASSWORD_MIN_LENGTH) {
      return NextResponse.json(
        { message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long` },
        { status: 400, headers }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 409, headers }
      );
    }

    const hashedPassword = await hash(password, {
      type: 2,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 4
    });

    const newUser = await prisma.user.create({
      data: {
        email,
        username: username || email,
        password: hashedPassword,
        isGuest: false
      }
    });

    if (!newUser) {
      return NextResponse.json(
        { message: 'Failed to create user' },
        { status: 500, headers }
      );
    }

    return NextResponse.json(
      {
        message: 'Registration successful',
        email: email
      },
      {
        status: 201,
        headers
      }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}