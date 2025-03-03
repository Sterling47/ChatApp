'use client'

import './globals.css'
import { useState } from 'react';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { FlipWords } from '@/components/ui/flip-words';
import RegisterModal from '@/components/RegisterModal';
import { LoginButton } from '@/components/LoginButton';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const words = ['Create!', 'Learn!', 'Teach!', 'Translate!']
  
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className='flex justify-center flex-col items-start h-[100vh]' id='home'> 
        <h1 className='ml-12 text-[6rem]'>Welcome to Chatt-r</h1>
        <div className='m-[3rem] text-[2rem]'>Your place to <FlipWords words={words}/></div>
        <LoginButton onClick={toggleModal} />
          {isModalOpen && <RegisterModal onClose={toggleModal}/>}
      <BackgroundBeams />
    </div>
  );
}
