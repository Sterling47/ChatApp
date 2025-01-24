import '../globals.css'
import Nav from '@/components/Nav'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from '@/lib/db';
import FirstTimeSetup from '@/components/FirstTimeSetup';
import { SeedUser } from '@/components/SeedUser';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

 
  const room = await prisma.room.findMany();
  const user = await SeedUser();
 
  return (
      <div className='grid h-screen grid-cols-9 grid-rows-12 p-0.25'>
        <Nav initialRooms={room} currentUser={user}/>
        {user.isFirstLogin ? (
          <FirstTimeSetup />
        ) : (
          children
        )}

      </div>
  )
}
