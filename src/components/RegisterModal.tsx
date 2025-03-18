"use client"

import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { Button } from "@/components/ui/button";

interface RegisterModalProps {
  onClose: () => void;
}

const RegisterModal = ({ onClose }: RegisterModalProps) => {

  return (
    <div data-testid='register-modal'>
      <div className="fixed inset-0 z-50">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={onClose}
        ></div>
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <AuthForm toggleModal={onClose} /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;