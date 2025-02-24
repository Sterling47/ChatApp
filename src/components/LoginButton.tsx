type LoginButtonProps = {
  children: React.ReactNode;
}

export const LoginButton: React.FC<LoginButtonProps> = ({ children }) => {
  return (
    <div>
      <style>
        {`
        @property --gradient-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        .login-btn {
          background: conic-gradient(
            from var(--gradient-angle),
            rgb(17, 188, 51),
            rgb(5, 180, 118),
            rgb(8, 175, 167),
            rgb(5, 180, 118),
            rgb(17, 188, 51)
          );
          animation: rotation 3s linear infinite;
          border-radius: 0.5rem;
          text-decoration: none;
          position: relative;
          isolation: isolate;
          z-index: 2;
          padding: .75rem 1.75rem;
          transition: box-shadow 0.2s ease;
          color: white;
        }

        .login-btn::before,
        .login-btn::after {
          content: '';
          position: absolute;
          inset: 2px;
          border-radius: inherit;
          z-index: -1;
          transition: inset 0.2s ease;
          background: var(--background, #111827);
        }

        .login-btn span {
          transition: text-shadow 0.2s ease;
          font-weight: 500;
        }

        .login-btn:hover {
          box-shadow: 0 4px 12px rgba(5, 180, 118, 0.25);
        }

        .login-btn:hover span {
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
        }

        .login-btn:active {
          box-shadow: 0 2px 6px rgba(5, 180, 118, 0.15);
        }

        .login-btn:active span {
          text-shadow: 0 0 4px rgba(255, 255, 255, 0.3);
        }

        @keyframes rotation {
          0% { --gradient-angle: 0deg; }
          100% { --gradient-angle: 360deg; }
        }
      `}
      </style>
      {children}
    </div>
  )
}

