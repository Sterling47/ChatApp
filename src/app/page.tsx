import './globals.css'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { LoginButton } from '@/components/LoginButton';
export default function Home() {
  return (
    <div className='home'>
      <h1>Welcome to ChatApp</h1>
      <LoginButton>
        <LoginLink>Sign In</LoginLink>
      </LoginButton>
    </div>
  );
}
