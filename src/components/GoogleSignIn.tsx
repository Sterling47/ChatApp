'use client'
import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    google: any;
  }
}
interface GoogleSignInProps {
  showSuccess: (message: string) => void
}

export default function GoogleSignIn({showSuccess}:GoogleSignInProps) {
  const router = useRouter();

  const handleCredentialResponse = useCallback(async (response: any) => {
    const baseURL = process.env.NEXT_PUBLIC_SITE_URL;
    try {
      const result = await fetch(`${baseURL}/api/auth/google-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken: response.credential }),
      });

      const data = await result.json();
      
      if (result.ok) {
        showSuccess("Login successful! Redirecting...")
        router.push(data.redirectUrl || '/Home');
      } else {
        console.error('Google authentication failed:', data.message);
      }
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  }, [router]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      window.google?.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
      window.google?.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        { theme: 'outline', size: 'large' }
      );
    };
    return () => {
      document.body.removeChild(script);
    };
  }, [handleCredentialResponse]);

  return (
    <div>
      <div id="googleSignInButton"></div>
    </div>
  );
}