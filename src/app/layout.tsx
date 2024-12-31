import { AuthProvider } from './AuthProvider';



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <title>Chatt-r</title>
          <meta name="description" content="This is a Next.js application" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
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
