import '../globals.css'
import Nav from '@/components/Nav'
import prisma from '@/lib/db';
import FirstTimeSetup from '@/components/FirstTimeSetup';
import { SeedUser } from '@/components/SeedUser';
import { ActiveRoomProvider } from '../contexts/ActiveRoomContext';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

 
  const room = await prisma.room.findMany();
  const user = await SeedUser();
 
  return (
    <ActiveRoomProvider>
      <div className='grid h-screen grid-cols-9 grid-rows-12 p-0.25'>
        <Nav initialRooms={room} currentUser={user}/>
        {user.isFirstLogin ? (
          <FirstTimeSetup />
        ) : (
          children
        )}

      </div>
    </ActiveRoomProvider>
  )
}
