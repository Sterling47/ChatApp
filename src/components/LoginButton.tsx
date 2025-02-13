type LoginButtonProps = {
  children: React.ReactNode;
}

export const LoginButton: React.FC<LoginButtonProps> = ({children}) => {
  return (
    <div className="login-btn">
      {children}
    </div>
  )
}

 