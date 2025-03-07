import { getCSRFToken } from "@/lib/auth/csrf";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
export const LogoutButton = () => {
  const router = useRouter();
  const userLogout = async () => {
    try {
      const baseURL = process.env.NEXT_PUBLIC_SITE_URL;
      const csrfToken = getCSRFToken();
      if (!csrfToken) {
        throw new Error('Missing CSRF token')
      }
      const resp = await fetch(`${baseURL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken
        }
      })
      const result = await resp.json()
      if (!resp.ok) {
        throw new Error('Could not log out')
      }
      setTimeout(() => {
        router.push(result.redirectUrl || '/');
      }, 300);

    } catch (error) {
      console.error('Error logging out', error)
    }
  }

  return (
    <div onClick={userLogout}
      tabIndex={0}
      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors 
      hover:text-black hover:cursor-pointer">
      <LogOut size={18} />
      <span className="text-sm ">Logout</span>
    </div>
  )
}

