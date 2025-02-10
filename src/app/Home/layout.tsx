import '../globals.css';
import Nav from '@/components/Nav';
import prisma from '@/lib/db';
import FirstTimeSetup from '@/components/FirstTimeSetup';
import { SeedUser } from '@/components/SeedUser';
import { ActiveRoomProvider } from '../contexts/ActiveRoomContext';
import { UserProvider } from '../contexts/UserContext';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const room = await prisma.room.findMany();
  const user = await SeedUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <ActiveRoomProvider>
      <UserProvider user={user}>
        <div className="grid h-screen grid-cols-9 grid-rows-12 p-0.25">
          <Nav initialRooms={room} />
          {user.isFirstLogin ? <FirstTimeSetup /> : children}
        </div>
      </UserProvider>
    </ActiveRoomProvider>
  );
}
