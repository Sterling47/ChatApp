import './globals.css'
import { BackgroundBeams } from '@/components/ui/background-beams';
import { FlipWords } from '@/components/ui/flip-words';
import RegisterModal from '@/components/RegisterModal';
import { LoginButton } from '@/components/LoginButton';

export default async function App() {
  const words = ['Create!', 'Learn!', 'Teach!', 'Translate!']
  

  return (
    <div className='flex justify-center flex-col items-start h-[100vh]' id='home'> 
        <h1 className='ml-12 text-[6rem]'>Welcome to Chatt-r</h1>
        <div className='m-[3rem] text-[2rem]'>Your place to <FlipWords words={words}/></div>
        <LoginButton>
          <RegisterModal/>
        </LoginButton>
      <BackgroundBeams />
    </div>
  );
}
