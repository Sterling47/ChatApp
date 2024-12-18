
import './globals.css'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { LoginButton } from '@/components/LoginButton';
import  RetroGrid from '@/components/ui/retro-grid'

export default async function App() {
  
  return (
    <div className='home'>
      <div className='login-box'>      
        <h1>Welcome to ChatApp</h1>
        <RetroGrid />
        <LoginButton>
          <LoginLink className='l-link'>Sign In</LoginLink>
        </LoginButton>
      </div>
    </div>
  );
}
