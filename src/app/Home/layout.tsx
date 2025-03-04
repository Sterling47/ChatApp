import '../globals.css'
import Nav from '@/components/Nav'
import prisma from '@/lib/db';
import FirstTimeSetup from '@/components/FirstTimeSetup';
import { ActiveRoomProvider } from '../contexts/ActiveRoomContext';
import { UserProvider } from '../contexts/UserContext';
import { redirect } from 'next/navigation';
import { getUser } from '@/lib/auth/user';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    const user = await getUser()
    if (!user) {
      redirect('/') 
    }
    const rooms = await prisma.room.findMany({
      where: user.isGuest 
        ? { isPrivate: false }  
        : {}                    
    });
    return (
      <ActiveRoomProvider>
        <UserProvider user={user}>
          <div className="grid h-screen grid-cols-9 grid-rows-12 p-0.25">
            <Nav initialRooms={rooms} />
            {user.isFirstLogin && user.isGuest === false? <FirstTimeSetup /> : children}
          </div>
        </UserProvider>
      </ActiveRoomProvider>
    );
  } catch (error) {
    console.error('Layout initialization failed:', error);
    throw error;
  }
}
