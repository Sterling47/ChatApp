'use client';
import { useEffect, useState } from 'react';
import { useUser } from "@/app/contexts/UserContext";

interface Friend {
    id: number;
    email: string;
    username: string;
    isOnline: boolean;
    friendshipId: number;
}

export default function FriendsList() {
    const user = useUser();
    const [friends, setFriends] = useState<Friend[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchFriends = async () => {
        if (user!.isGuest) {
            setIsLoading(false);
            return;
        }
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
    }, [user!.isGuest]);

    if (isLoading) {
        return <div>Loading friends...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    if (user!.isGuest) {
        return (
            <div className="row-start-1 row-end-13 col-start-2 col-end-10 bg-zinc-900 flex flex-col items-center justify-center text-white p-4">
                <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 max-w-md shadow-md">
                    <h3 className="text-xl font-semibold mb-2 text-center">👋 Friends Feature</h3>
                    <p className="mb-4 text-zinc-300">Guest users cannot view or manage friends. Sign up for an account to connect with others!</p>
                    <div className="flex gap-3 justify-center">
                        <a href="/api/auth/signin" className="bg-[#E79140] hover:bg-[#d07d30] text-white px-4 py-2 rounded-md transition-colors">
                            Sign In
                        </a>
                        <a href="/register" className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-md transition-colors">
                            Create Account
                        </a>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="row-start-1 row-end-13 col-start-2 col-end-10 bg-slate-500 flex flex-col">
            <h2>Your Friends</h2>
            {friends.length === 0 ? (
                <p>You have no friends yet. Start adding some!</p>
            ) : (
                <div className='space-y-1'>
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
                            <div className='flex items-center space-x-2'>
                                <span className={`inline-block w-2 h-2 rounded-full ${friend.isOnline ? 'bg-green-400' : 'bg-zinc-500'}`}></span>
                                <p className='text-black'>{friend.isOnline ? 'Online' : 'Offline'}</p>
                            </div>
                        </div>
                    ))}
                </div>

            )}
        </div>
    );

}