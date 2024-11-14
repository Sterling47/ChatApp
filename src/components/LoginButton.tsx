import React from "react"

type LoginButtonProps = {
  children: React.ReactNode;
}

export const LoginButton: React.FC<LoginButtonProps> = ({children}) => {
  return (
    <button className="login-btn">
      {children}
    </button>
  )
}

 