import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  const { getUser } = await getKindeServerSession(); // Assume you have a function to get the current user

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
