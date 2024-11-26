import './globals.css'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { LoginButton } from '@/components/LoginButton';

export default async function LoginPage() {

  return (
    <div className='home'>
      <div className='login-box'>      
        <h1>Welcome to ChatApp</h1>
        <LoginButton>
          <LoginLink className='l-link'>Sign In</LoginLink>
        </LoginButton>
      </div>
    </div>
  );
}
