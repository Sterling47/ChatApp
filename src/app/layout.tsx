import { AuthProvider } from './AuthProvider';
import Nav from '@/components/Nav';


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <head>
          <title>My Next.js App</title>
          <meta name="description" content="This is a Next.js application" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Cambay:ital,wght@0,400;0,700;1,400;1,700&family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap');
          </style>
        </head>
        <body>
          <main>
            {children}
          </main>
        </body>
      </html>
    </AuthProvider>
  );
}
