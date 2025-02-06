'use client'
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from '../../../contexts/UserContext';
import { initialUserSetup, updateProfileSettings } from '@/app/actions/actions';

const ProfileSettings = () => {
  const user = useUser();
  const [newEmail, setNewEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const hiddenPass = user?.password ? '*'.repeat(user.password.length) : '';

  return (
    <form 
    className="p-4 max-w-md mx-auto text-white w-[50rem]">
      <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <div className='flex gap-x-4'>
          <Input
            type="text"
            value={user?.email || ''}
            disabled
            className="bg-gray-800 text-white border border-gray-600 rounded p-2 mb-2"
          />
          <Input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter new email"
            className="bg-[#1A1A1A] text-white border border-gray-600 rounded p-2"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Username</label>
        <div className='flex gap-x-4'>
          <Input
            type="text"
            value={user?.username || ''}
            disabled
            className="bg-gray-800 text-white border border-gray-600 rounded p-2 mb-2"
          />
          <Input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Enter new username"
            className="bg-[#1A1A1A] text-white border border-gray-600 rounded p-2"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Password</label>
        <div className='flex gap-x-4'>
          <Input
            type="text"
            value={hiddenPass}
            disabled
            className="bg-gray-800 text-white border border-gray-600 rounded p-2 mb-2"
          />
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="bg-[#1A1A1A] text-white border border-gray-600 rounded p-2"
          />
        </div>
      </div>

      <Button 
      type='submit'
      className="w-full bg-accent hover:bg-[#e76f0d] text-white font-bold py-2 px-4 rounded">
        Save
      </Button>
    </form>
  );
};

export default ProfileSettings;