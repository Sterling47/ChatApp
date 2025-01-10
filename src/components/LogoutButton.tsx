import Link from "next/link"

export const LogoutButton = () => {
  return (
    <Link className="bg-transparent text-white h-auto w-auto p-2 hover:text-[#ff7f11]" href='/'>
      Sign out
    </Link>
  )
}

 