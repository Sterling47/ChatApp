import React, { useState, useEffect } from 'react';
import type { Room } from '@prisma/client';
import { pusherClient } from '@/lib/pusher-client';
import { MdOutlinePublic } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import { useActiveRoom } from "@/app/contexts/ActiveRoomContext";

interface RoomModalforMobileProps {
    initialRooms: Room[]
}

const RoomModalforMobile: React.FC<RoomModalforMobileProps> = ({ initialRooms }) => {
    const [rooms, setRooms] = useState<Room[]>(initialRooms);
    const { activeRoomId, setActiveRoomId } = useActiveRoom();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        pusherClient.subscribe('rooms-channel');
        const createRoomHandler = (data: Room) => {
            setRooms(prev => [...prev, { ...data, isIncoming: true }]);
        };
        pusherClient.bind('rooms-created', createRoomHandler);
        return () => {
            pusherClient.unsubscribe('rooms-channel');
            pusherClient.unbind('rooms-created', createRoomHandler);
        };
    }, []);

    const renderRoomLink = (room: Room) => (
        <div className='flex items-center overflow-y-auto' key={room.id}>
            <IconContext.Provider value={{ className: "text-[#ff7f11] w-6 h-6 flex-shrink-0" }}>
                {room.isPrivate ? <RiGitRepositoryPrivateFill /> : <MdOutlinePublic />}
            </IconContext.Provider>
            <button
                className={`text-grey no-underline ml-2 text-sm hover:text-[#ff7f11] overflow-x-hidden truncate 
                ${activeRoomId === room.id ? 'text-[#ff7f11] font-bold' : ''}`}
                onClick={() => {
                    setActiveRoomId(room.id);
                    setIsOpen(false);
                }}
            >
                {room.name}
            </button>
        </div>
    );

    return (
        <div className='row-start-1 row-end-3 md:hidden lg:hidden xl:hidden'>
            <button onClick={() => setIsOpen(true)} className="text-white rounded-md">Chat Rooms</button>
            {isOpen && (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-black  bg-opacity-50">
                    <div className=" flex flex-col justify-between bg-primary rounded-2xl w-[60%] h-[50%] p-6 shadow-xl">
                        <h3 className="text-lg font-medium leading-6 text-white">Rooms</h3>
                        <div className="flex flex-col gap-3 mt-2 h-[80%]">
                            {rooms.map(renderRoomLink)}
                        </div>
                        <button onClick={() => setIsOpen(false)} className="mt-4 text-white bg-slate-700 p-2 w-full rounded-md">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomModalforMobile;
