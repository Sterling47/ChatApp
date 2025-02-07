import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function GET() {
    const { getUser } = getKindeServerSession();
    
    try {
        const user = await getUser();
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
                userID: currentUser.id
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