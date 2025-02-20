import { csrfProtectionMiddleware, validateCSRFToken } from "@/lib/auth/csrf";
import { endSession } from "@/lib/auth/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, resp: NextResponse) {
  try {
    const secret = process.env.JWT_SECRET!
    const sessionId = req.cookies.get('sessionId')?.value
    if (!sessionId) {
      return NextResponse.json(
        { message: 'No session found' },
        { status: 401 }
      )
    }
    const response = NextResponse.json(
      {
        message: 'Successfully logged out',
        redirectUrl: '/'
      },
      { 
        status: 200
      }
    );
    await csrfProtectionMiddleware(req, resp, secret);
    const sessionResponse = endSession(response)
    return sessionResponse
  }
  catch (error) {
    console.error('Error logging out', error)
    return NextResponse.json(
      { message: 'An error occurred during logout' },
      { status: 500 }
    )
  }
} 
