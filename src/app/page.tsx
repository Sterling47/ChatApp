
import './globals.css'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { LoginButton } from '@/components/LoginButton';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { FlipWords } from '@/components/ui/flip-words';



export default async function App() {
  const words = ['Create!', 'Learn!', 'Teach!', 'Translate!']
  

  return (
    <div className='flex justify-center flex-col items-start h-[100vh]' id='home'> 
        <h1 className='ml-12 text-[6rem]'>Welcome to Chatt-r</h1>
        <p className='m-[3rem] text-[2rem]'>Your place to <FlipWords words={words}/></p>
        <LoginButton>
          <LoginLink className='z-auto hover:cursor-pointer'>Sign In</LoginLink>
        </LoginButton>
      <BackgroundBeams />
    </div>
  );
}
6