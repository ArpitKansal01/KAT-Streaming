import React from 'react'
import { FaList } from "react-icons/fa";
import { ChannelPlaylistsType } from '../utils/Types';
import { Link } from 'react-router-dom';

function ChannelPlaylistCard({ item, channelId }: { item: ChannelPlaylistsType, channelId: string }) {
    return (
        <Link to={`/playlist/${channelId}/${item.id}`}>
            <div className='col flex flex-col hover:scale-[101%] duration-200 ease-in-out'>
                {/* thumbnail */}
                <div className="relative ">
                    <div className="absolute flex gap-2 items-center bottom-2 right-2 bg-[#0c0c0cd0] px-2 py-0.5 rounded">
                        < FaList />
                        <h3>{item.videoCount} videos</h3>
                    </div>
                    <img src={item.thumbnail} className="bg-bg-neutral-900 object-cover aspect-[16/9] rounded" alt="" />
                </div>
                {/* title */}
                <div className="flex flex-col gap-1 mt-1">
                    <h1 className='sm:text-md text-sm line-clamp-1'>{item.title}</h1>
                </div>
            </div >
        </Link>
    )
}

export default ChannelPlaylistCard