'use client'
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { LogoutButton } from "./LogoutButton"
import { useState } from "react"


export default function Nav() {

  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  }

  return (
    <nav>
      <div className="user-bar">
        <button className="user-bttn" onClick={toggleModal}>
          <h4>user</h4>
        </button>
        {isModalOpen && (
          <div className="user-modal">
            <LogoutButton>
              <LogoutLink className="lo-link">Logout</LogoutLink>
            </LogoutButton>
          </div>
        )}
        <ul className='nav-menu-wrapper'>
          <li> <img className="icon" src="private-chat-icon.png" alt="Public Icon" /></li>
          <li> <img className="icon" src="public-chat-icon.png" alt="" /></li>
        </ul>
      </div>
      <div className="user-select-display"> 
      </div>
      
    </nav>
  )
}
