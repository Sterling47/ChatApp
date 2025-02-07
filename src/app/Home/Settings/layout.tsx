'use client'

import Link from "next/link";
import { IoSettingsSharp } from "react-icons/io5";
import { usePathname } from 'next/navigation'
const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname.includes(path);

  return (
    <div className="col-start-2 col-span-8 row-start-1 row-span-12 bg-[#1A1A1A] flex flex-col">
      <header className="flex items-center gap-2 p-4 text-white">
        <IoSettingsSharp className="w-6 h-6" />
        <h1 className="text-xl">Settings</h1>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <nav className="w-64 p-4 flex-shrink-0">
          <div className="space-y-1">
            <Link 
              href="/Home/Settings/Profile"
              className={`block px-4 py-3 text-white rounded-lg transition-colors
                ${isActive('Profile') 
                  ? 'bg-[#2B2D31]' 
                  : 'hover:bg-[#2B2D31]'}`}
            >
              Profile
            </Link>
            <Link 
              href="/Home/Settings/Rooms"
              className={`block px-4 py-3 text-white rounded-lg transition-colors
                ${isActive('Rooms') 
                  ? 'bg-[#2B2D31]' 
                  : 'hover:bg-[#2B2D31]'}`}
            >
              Rooms
            </Link>
            <Link 
              href="/Home/Settings/Account"
              className={`block px-4 py-3 text-white rounded-lg transition-colors
                ${isActive('Account') 
                  ? 'bg-[#2B2D31]' 
                  : 'hover:bg-[#2B2D31]'}`}
            >
              Account
            </Link>
          </div>
        </nav>
        <main className="flex-1 p-4 overflow-auto">
          <div className="flex justify-center">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsLayout