import { LoginButton } from "@/components/LoginButton";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

import React from 'react'

const Loginpage = () => {
  return (
    <main >
       <LoginButton>
        <LoginLink>Sign In</LoginLink>
    </LoginButton>
    </main>
  )
}

export default Loginpage