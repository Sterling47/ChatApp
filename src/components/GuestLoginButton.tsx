'use client'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button';
import { setCSRFToken } from '@/lib/utils';
interface GuestLoginProps {
  handleGuest: (message: string) => void;
}
function GuestLogin({ handleGuest }: GuestLoginProps) {
  const router = useRouter();
  const loginGuest = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const baseURL = process.env.NEXT_PUBLIC_SITE_URL;
      const resp = await fetch(`${baseURL}/api/auth/guest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ timestamp: new Date().toISOString() }),
      });
      const result = await resp.json()
      if (!resp.ok) {
        throw new Error('Could not login as guest')
      }
      const csrfToken = resp.headers.get('x-csrf-token');
      if (csrfToken) {
        setCSRFToken(csrfToken);
      }
      handleGuest("Welcome, Guest!")
      setTimeout(() => {
        router.push(result.redirectUrl || '/Home');
      }, 1000);
    } catch (error) {
      console.error('Guest Login failed', error);
      throw error;
    }
  }
  return (
    <Button
      variant="secondary"
      type='button'
      className="w-full text-white bg-orange-500 hover:bg-orange-600 transition"
      onClick={loginGuest}
    >
      Sign in as Guest
    </Button> //show validation message, change button text to msg
  )
}

export default GuestLogin


