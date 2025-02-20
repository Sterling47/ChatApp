import { getCSRFToken, setCSRFToken } from "@/lib/auth/csrf";
import { Button } from "./ui/button";

export const LogoutButton = () => {
  const userLogout = async () => {
    try {
      const baseURL = process.env.NEXT_PUBLIC_SITE_URL;
      const csrfToken = getCSRFToken()
      if (!csrfToken) {
        throw new Error('Could not find csrfToken')
      }
      const resp = await fetch(`${baseURL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'x-csrf-token': csrfToken
        }
      })
      if (resp.ok) {
        setCSRFToken('')
      }
    } catch (error) {
      console.error('Error logging out', error)
    }
  }

  return (
    <Button onClick={userLogout}
      className="p-2 hover:bg-gray-100 rounded-lg transition-colors hover:text-black">
      <span className="text-sm">Logout</span></Button>
  )
}

