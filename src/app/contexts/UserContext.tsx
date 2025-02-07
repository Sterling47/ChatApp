'use client'
import type { User } from "@prisma/client";
import React, { createContext, useContext } from 'react';

const UserContext = createContext<User | null>(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ user, children }: { user: User; children: React.ReactNode }) => (
  <UserContext.Provider value={user}>{children}</UserContext.Provider>
);