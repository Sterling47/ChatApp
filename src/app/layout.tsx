import {AuthProvider} from './AuthProvider';
import Home from './page';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Home/>
        </body>
      </html>
    </AuthProvider>
  );
}
