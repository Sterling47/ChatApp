
import './globals.css'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { LoginButton } from '@/components/LoginButton';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { FlipWords } from '@/components/ui/flip-words';



export default async function App() {
  const words = ['Create!', 'Learn!', 'Teach!', 'Translate!']
  

  return (
    <div className='home' id='home'> 
        <h1>Welcome to Chatt-r</h1>
        <p>Your place to <FlipWords words={words}/></p>
        <LoginButton>
          <LoginLink className='l-link'>Sign In</LoginLink>
        </LoginButton>
      <BackgroundBeams />
    </div>
  );
}
