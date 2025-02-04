'use client'

import Link from "next/link";
import { IoSettingsSharp } from "react-icons/io5";
import { usePathname } from 'next/navigation'
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allPaths = usePathname()
  const isActive = (pathname: string) => allPaths.split('/')[3] === pathname;

  return (

    <div className="row-start-1 row-end-13 col-start-2 col-end-10 h-full flex flex-col bg-[#1e1e1e] p-1">
      <div className="flex justify-center items-center w-60">
        <div className="flex flex-col text-white rounded-lg p-2 ">
          <div className="flex items-center">
            <IoSettingsSharp className="w-6 h-6 mr-2" />
            <span className="text-lg ">Settings</span>
          </div>
          <section className="flex flex-col gap-4 w-40 pt-10 pl-6">
            <Link
              href={'/Home/Settings/Profile'}
              className={`text-lg p-2 rounded-lg hover:bg-gray-700 hover:rounded-lg transition-colors duration-200
                ${isActive('Profile') ? 'bg-gray-700' : ''}
                `}
            >
              Profile
            </Link>


            <Link
              href={'/Home/Settings/Rooms'}
              className={`text-lg p-2 rounded-lg hover:bg-gray-700 hover:rounded-lg transition-colors duration-200
                ${isActive('Rooms') ? 'bg-gray-700' : ''}
                `}
            >
              Rooms
            </Link>
            <Link
              href={'/Home/Settings/Misc'}
              className={`text-lg p-2 rounded-lg hover:bg-gray-700 hover:rounded-lg transition-colors duration-200
                ${isActive('Misc') ? 'bg-gray-700' : ''}
                `}
            >
              Misc
            </Link>
          </section>
        </div>
        <div className="w-full h-full p-2 border-red-100 border-spacing-8 rounded-lg">
          {children}
        </div>
      </div>
    </div>



  )
}
