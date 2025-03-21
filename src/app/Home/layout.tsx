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
            <div className="grid  h-screen p-0.25 grid-cols-1 md:grid-cols-9 grid-rows-12">
            <Nav initialRooms={rooms} />
            {user.isFirstLogin && user.isGuest === false? <FirstTimeSetup /> :
             <div className='  row-start-3 row-end-13 col-start-1 col-end-10  md:row-start-1 md:row-end-13 md:col-start-3 md:col-end-10 lg:col-start-3 lg:col-end-10 lg:border-none lg:row-start-1 lg:row-end-13 '> 
             {children}
              </div>}
          </div>
        </UserProvider>
      </ActiveRoomProvider>
    );
  } catch (error) {
    console.error('Layout initialization failed:', error);
    throw error;
  }
}
