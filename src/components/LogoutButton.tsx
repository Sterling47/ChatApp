import Link from "next/link"

export const LogoutButton = () => {
  return (
    <Link className="logout-btn bg-transparent text-white h-auto w-auto p-2" href='/'>
      Sign out
    </Link>
  )
}

 