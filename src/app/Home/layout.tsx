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
  console.log(user)
  // if (user && user.email && user.isFirstLogin) {
  //   const dbUser = await prisma.user.findUnique({
  //     where: { email: user.email },
  //   });
    
  //   isFirstLogin = dbUser!.isFirstLogin
  // }
  
 

  return (
      <div className='grid h-screen grid-cols-9 grid-rows-12 p-0.25'>
        <Nav initialRooms={room} currentUser={user}/>
        {/* {isFirstLogin ? (
          <FirstTimeSetup />
        ) : (
          children
        )} */}

        {user.isFirstLogin && <FirstTimeSetup />}
      </div>
  )
}
