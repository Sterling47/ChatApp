'use client'
import { useState } from 'react';


interface UserResult {
  id: number;
  email: string;
  username: string;
  isOnline: boolean;
}

export default function UserSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<UserResult[]>([]);

  const handleSearch = async (term: string) => {
    // if (term.length === user.username) {
    //   setSearchResults([]);
    //   return;
    // }
    
    try {
      const baseURL = process.env.KINDE_SITE_URL
      const response = await fetch(`${baseURL}/api/search-users?query=${term}`);
      const data = await response.json();
      setSearchResults(data.users);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        search
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#ff7f11]"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(e.target.value);
          }}
        />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {searchResults.map((user) => (
          <div key={user.id} className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <span className="font-medium">{user.username}</span>
            <p className="text-sm text-gray-500">{user.email}</p>
            <span className={`text-xs ${user.isOnline ? 'text-green-500' : 'text-gray-400'}`}>
              {user.isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}