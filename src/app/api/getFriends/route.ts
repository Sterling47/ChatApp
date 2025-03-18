import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getUser } from '@/lib/auth/user';
import { getSession } from '@/lib/auth/session';
export async function GET(req: NextRequest) {
    try {
        const user = await getUser();
        const secret = process.env.JWT_SECRET!
        const authToken = req.cookies.get('auth')?.value
        const session = await getSession(authToken, secret)
        if (!session) {
            return NextResponse.json(
                { message: 'Invalid or expired session' },
                { status: 401 }
            )
        }
        if (!user || !user.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const currentUser = await prisma.user.findUnique({
            where: { email: user.email },
        });

        if (!currentUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const friends = await prisma.friend.findMany({
            where: {
                userID: currentUser.id,
                friend: {
                    isGuest: false
                }
            },
            include: {
                friend: {
                    select: {
                        id: true,
                        email: true,
                        username: true,
                        isOnline: true
                    }
                }
            }
        });

        return NextResponse.json({
            friends: friends.map(f => ({
                id: f.friend.id,
                email: f.friend.email,
                username: f.friend.username,
                isOnline: f.friend.isOnline,
                friendshipId: f.id
            }))
        }, { status: 200 });
    } catch (error) {
        console.error('Failed to fetch friends:', error);
        return NextResponse.json({ error: 'Failed to fetch friends' }, { status: 500 });
    }
}