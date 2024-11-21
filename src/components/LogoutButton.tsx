type LogoutButtonProps = {
  children: React.ReactNode;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({children}) => {
  return (
    <div className="logout-btn">
      {children}
    </div>
  )
}

 