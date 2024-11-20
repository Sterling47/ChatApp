import {AuthProvider} from './AuthProvider';
import Nav from '@/components/Nav';


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <main>
            {children}
          </main>
        </body>
      </html>
    </AuthProvider>
  );
}
