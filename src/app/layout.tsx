import {AuthProvider} from './AuthProvider';
import Header from '@/components/Header';


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <header>
            <Header/>
          </header>
          <main>
            {children}
          </main>
        </body>
      </html>
    </AuthProvider>
  );
}
