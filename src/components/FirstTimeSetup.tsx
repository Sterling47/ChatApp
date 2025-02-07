'use client';
import { initialUserSetup } from '@/app/actions/actions';

const FirstTimeSetup = () => {

  return (
    <div className="flex justify-center items-center w-full h-full absolute backdrop-blur-sm">
      <div className="flex justify-start flex-col items-center p-[2rem] w-[50%] h-[50%] rounded-lg bg-primary">
        <h2 className="text-2xl font-bold mb-4">Let's get set up!</h2>
        <form action={initialUserSetup} className="flex h-[70%] flex-col justify-evenly items-center w-full">
          <label className="flex flex-col w-full">
            Create Username:
            <input type="text" name="username" required className="mt-1 p-2 border text-black rounded w-[20rem]" />
          </label>
          <button type="submit" className="p-[.5rem] bg-black text-white rounded-lg hover:bg-gray-800 transition">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default FirstTimeSetup

