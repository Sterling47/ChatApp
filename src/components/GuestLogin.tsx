'use client'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button';

function GuestLogin() {
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
      console.log(resp)
      router.push('/Home');
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
    </Button>
  )
}

export default GuestLogin


