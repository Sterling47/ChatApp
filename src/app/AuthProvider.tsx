"use client";
import {KindeProvider} from "@kinde-oss/kinde-auth-nextjs";
import React from 'react';
type AuthProviderProps = {
    children: React.ReactNode;
  }

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  return <KindeProvider>{children}</KindeProvider>;
};