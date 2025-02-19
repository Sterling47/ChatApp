import { getCSRFToken, setCSRFToken } from "@/lib/auth/csrf";

export const Logout = async () => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_SITE_URL;
    const csrfToken = getCSRFToken()
    if (!csrfToken) {
      throw new Error ('Could not find csrfToken')
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

