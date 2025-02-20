'use client'
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X } from "lucide-react";
import { setCSRFToken } from "@/lib/utils";


interface AuthFormProps {
  toggleModal: () => void;
}

interface AuthCredentials {
  email: string;
  password: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  general?: string;
}

const AuthForm = ({ toggleModal }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [guestLogin, setGuestLogin] = useState(false);
  const [guestMessage, setGuestMessage] = useState<string | null>(null)
  const router = useRouter();
  const loginUser = async (credentials?: AuthCredentials, isGuest: boolean = false) => {
    const baseURL = process.env.NEXT_PUBLIC_SITE_URL;
    try {
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      };
      if (isGuest) {
        requestOptions.headers = {
          ...requestOptions.headers,
          'x-login-type': 'guest'
        }
      }
      else {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }
        requestOptions.body = JSON.stringify(credentials)
      }
      const resp = await fetch(`${baseURL}/api/auth/login`, requestOptions);
      const csrfToken = resp.headers.get('x-csrf-token');
      if (csrfToken) {
        setCSRFToken(csrfToken);
      }
      const result = await resp.json();
      if (!resp.ok) {
        throw new Error(result.message || 'Login failed');
      }
      if(!isGuest) {
        setSuccess("Login successful! Redirecting...");
      }
      return result;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const registerUser = async (credentials: AuthCredentials) => {
    try {
      const baseURL = process.env.NEXT_PUBLIC_SITE_URL;
      const resp = await fetch(`${baseURL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const result = await resp.json();
      if (!resp.ok) {
        throw new Error(result.error || 'Registration failed');
      }
      setSuccess("Registration successful! Logging you in...");
      return result;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };


  const validateForm = (credentials: AuthCredentials): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!credentials.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(credentials.email)) {
      errors.email = "Invalid email address";
    }

    if (!credentials.password) {
      errors.password = "Password is required";
    } else if (isSignUp && credentials.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    return errors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>, isGuestLogin = false) => {
    event.preventDefault();
    setErrors({});
    setIsSubmitting(true);
    setSuccess(null);
    try {
      let result;
      if (isGuestLogin) {
        setGuestLogin(true);
        setGuestMessage("Note: Guests can only access public rooms and have limited features.");
        result = await loginUser(undefined, true);
      }
      else {
        const formData = new FormData(event.currentTarget);
        const credentials: AuthCredentials = {
          email: formData.get('email') as string,
          password: formData.get('password') as string,
        };

        const validationErrors = validateForm(credentials);
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          setIsSubmitting(false);
          return;
        }

        if (isSignUp) {
          await registerUser(credentials);
          result = await loginUser(credentials);
        } else {
          result = await loginUser(credentials);
        }
        setSuccess("Login successful! Redirecting...");
      };
      setTimeout(() => {
        router.push(result.redirectUrl || '/Home');
      }, 1500);
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : "An unexpected error occurred"
      });
      console.error('Auth error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSignUp = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsSignUp(!isSignUp);
  };

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
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(${isSignUp ? '-100%' : '0%'})` }}
        >
          {/* Sign In Form */}
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
              <form onSubmit={handleSubmit} className="space-y-4">
                {success && (
                  <Alert className="bg-green-100 border-green-400 text-green-700">
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}
                {errors.general && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.general}</AlertDescription>
                  </Alert>
                )}
                {guestMessage && (
                  <Alert className="bg-orange-100 border-orange-400 text-orange-700">
                    <AlertDescription>{guestMessage}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    name="email"
                    id="login-email"
                    type="email"
                    placeholder="m@example.com"
                    className={errors.email ? "border-red-500" : ""}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    name="password"
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    className={errors.password ? "border-red-500" : ""}
                    aria-invalid={errors.password ? "true" : "false"}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-9 text-sm text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <Button
                  type="submit"
                  className="login-btn w-full bg-gray-800 text-white hover:bg-gray-900 transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Sign In"}
                </Button>
              </form>
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
                {guestLogin ? (
                  <div className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-yellow-100 rounded-lg border border-yellow-200 shadow-md transition-all duration-300 transform hover:scale-105">
                    <h3 className="text-amber-700 font-medium text-lg text-center">Welcome Guest!</h3>
                    <p className="text-amber-600 text-sm text-center">We're preparing your experience...</p>
                  </div>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={(e) => handleSubmit(e as unknown as FormEvent<HTMLFormElement>, true)}
                    className="w-full bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors duration-200"
                    disabled={isSubmitting}
                  >
                    Continue as Guest
                  </Button>
                )}
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    name="email"
                    id="signup-email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    name="password"
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    required
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
                    className="w-[48%]"
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

export default AuthForm;