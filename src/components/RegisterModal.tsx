"use client"

import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import { Button } from "@/components/ui/button";

const RegisterModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Button className='z-20 hover:cursor-pointer bg-transparent hover:bg-transparent'onClick={openModal}>Sign In</Button>
      {isModalOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg">
              <RegisterForm closeModal={closeModal}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterModal;