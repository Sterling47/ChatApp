'use client';

import { useEffect, useState } from "react";
import { addFriend } from "@/app/actions/actions";


interface UserResult {
  id: number;
  username: string;
  email: string;
}

export default function UserSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<UserResult[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserResult[]>([]);

  const fetchUsers = async (query = "") => {
    try {
      const baseURL = process.env.NEXT_PUBLIC_SITE_URL || ""; 
      const response = await fetch(`${baseURL}/api/search-user?query=${query}`);
      const data = await response.json();
      setUsers(data.users);
      setFilteredUsers(data.users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(); 
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term) {
      setFilteredUsers(users); 
      return;
    }
    setFilteredUsers(
      users.filter(
        (user) =>
          user.username.toLowerCase().includes(term.toLowerCase()) ||
          user.email.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <span>Search</span>
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#ff7f11]"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.id} className="flex flex-row p-2 gap-4 m-1 bg-gray-300 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className="grid place-items-center h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500">
                {user.username[0]}
              </div>
              <div>
                <span className="font-medium">{user.username}</span>
                <p className="text-sm text-gray-900">{user.email}</p>

                {user.isFrikend ? (
                  <p className="text-green-500">Already friends</p>
                ) : (
                  <form action={addFriend}>
                  <input type="hidden" name="friendId" value={user.id} />
                  <button type="submit" className="bg-slate-500 text-white px-3 py-1 rounded-md">
                    Add Friend
                  </button>
                  </form>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
}