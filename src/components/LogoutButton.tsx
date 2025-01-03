import Link from "next/link"

export const LogoutButton = () => {
  return (
    <Link className="logout-btn lo-link" href='/'>
      Sign out
    </Link>
  )
}

 