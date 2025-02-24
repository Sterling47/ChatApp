"use client"

import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { Button } from "@/components/ui/button";

const RegisterModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <Button className='login-btn mx-[3rem] z-20 hover:cursor-pointer bg-transparent hover:bg-transparent'onClick={toggleModal}>
        <span>Sign In</span>
      </Button>
      {isModalOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={toggleModal}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg">
              <AuthForm toggleModal={toggleModal}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterModal;