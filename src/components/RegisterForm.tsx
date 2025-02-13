import { useState, FormEvent } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

const RegisterForm = ({ toggleModal }: { toggleModal: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between Sign In and Sign Up

  async function registerUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    try {
      const baseURL = process.env.NEXT_PUBLIC_SITE_URL;
      const resp = await fetch(`${baseURL}api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await resp.json();
      if (!resp.ok) {
        throw new Error(result.error || 'Registration failed');
      }
      console.log('Registration successful:', result);
    } catch (error) {
      console.log(error);
    }
    console.log(email, password)
  }
  const toggleSignUp = () => {
    event!.preventDefault();
    setIsSignUp(!isSignUp)
  }
  return (
    <div className="w-full max-w-md mx-auto relative">
      <button
        onClick={toggleModal}
        className="z-50 absolute top-3 right-3 p-1 rounded-lg hover:bg-gray-100 transition"
        aria-label="Close"
      >
        <X className="text-black w-6 h-6" />
      </button>
      <Card className="overflow-hidden">
        <div className="flex transition-transform duration-300" style={{ transform: `translateX(${isSignUp ? '-100%' : '0%'})` }}>
          <div className="min-w-full">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
              <CardDescription>Choose your preferred sign in method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center space-x-2 hover:bg-gray-100 transition"
                onClick={() => console.log("Google sign in clicked")}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span>Continue with Google</span>
              </Button>
              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              {/* Sign-In Form */}
              <form onSubmit={registerUser} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input name="email" id="email" type="email" placeholder="m@example.com" />
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    name="password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-9 text-sm text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <Button type="submit" className="w-full bg-gray-800 text-white hover:bg-gray-900 transition">
                  Sign In
                </Button>
              </form>
              {/* Create Account and Forgot Password Links */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Button
                    variant="link"
                    className="px-0 text-sm"
                    onClick={() => setIsSignUp(true)}
                  >
                    Create account
                  </Button>
                  <Button variant="link" className="px-0 text-sm">
                    Forgot password?
                  </Button>
                </div>
                {/* Guest Sign-In */}
                <Button
                  variant="secondary"
                  className="w-full text-white bg-orange-500 hover:bg-orange-600 transition"
                  onClick={() => console.log("Guest sign in clicked")}
                >
                  Sign in as Guest
                </Button>
              </div>
            </CardContent>
          </div>
          {/* Sign Up Form */}
          <div className="min-w-full">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
              <CardDescription>Create your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={registerUser} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input name="email" id="email" type="email" placeholder="m@example.com" />
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    name="password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-9 text-sm text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    type="submit"
                    className="w-[48%] bg-orange-500 hover:bg-orange-600 transition"
                  >
                    Sign Up
                  </Button>
                  <Button
                    className='w-[48%]'
                    variant="outline"
                    onClick={toggleSignUp}
                  >
                    Go Back
                  </Button>
                </div>
              </form>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RegisterForm;