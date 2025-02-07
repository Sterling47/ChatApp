'use client';

import { useEffect, useState } from 'react';

interface Friend {
    id: number;
    email: string;
    username: string;
    isOnline: boolean;
    friendshipId: number;
}

export default function FriendsList() { 
    const [friends, setFriends] = useState<Friend[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const fetchFriends = async () => {
        try {
            setIsLoading(true);
            const baseURL = process.env.NEXT_PUBLIC_SITE_URL || '';
            const response = await fetch(`${baseURL}/api/getFriends`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch friends');
            }
            
            const data = await response.json();
            setFriends(data.friends);
            setError(null);
        } catch (error) {
            console.error('Failed to fetch friends:', error);
            setError('Could not load friends. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchFriends(); 
    }, []);   
    
    if (isLoading) {
        return <div>Loading friends...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="row-start-1 row-end-13 col-start-2 col-end-10 bg-slate-500 flex flex-col">
            <h2>Your Friends</h2>
            {friends.length === 0 ? (
                <p>You have no friends yet. Start adding some!</p>
            ) : (

                <div>
                    {friends.map(friend => (
                    <div 
                        key={friend.friendshipId} 
                        className="flex items-center justify-start gap-36  w-[97%] rounded-md h-20 bg-white"
                    >
                        <div className="grid place-items-center h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500">
                {friend.username[0]}
              </div>
                        <p className='text-black'>{friend.username}</p>
                        <p className='text-black'>{friend.email}</p>
                        <p className='text-black'>{friend.isOnline ? 'Online' : 'Offline'}</p>
                    </div>
                ))}
                </div>
                
            )}
        </div>
    );
}