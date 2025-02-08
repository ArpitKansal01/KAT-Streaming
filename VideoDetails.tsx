import React, { useState } from 'react';
import { BiLike } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import { HomeVideoCardType } from '../utils/Types';
import { Link } from 'react-router-dom';

function VideoDetails({ details }: { details?: HomeVideoCardType }) {
    const [showDescription, setShowDescription] = useState(false);
    const [showShareOptions, setShowShareOptions] = useState(false);

    const formatNumber = (num) => {
        if (num >= 1e6) {
            return (num / 1e6).toFixed(1) + 'M';
        } else if (num >= 1e3) {
            return (num / 1e3).toFixed(1) + 'K';
        }
        return num;
    };

    const handleShareClick = () => {
        setShowShareOptions(!showShareOptions);
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href); // Copy current URL to clipboard
        alert('Link copied to clipboard!'); // Notify user
        setShowShareOptions(false); // Close share options
    };

    return (
        <div className='flex flex-col gap-2 mt-2 mx-1'>
            {/* Video Title */}
            <h1 className='md:text-2xl sm:text-xl text-lg font-semibold'>{details?.videoTitle}</h1>

            <div className="md:flex justify-between">
                {/* Channel Info */}
                <div className="flex gap-3">
                    <Link to={`/channel/${details?.channelInfo.id}`}>
                        <img src={details?.channelInfo.image} className="w-12 aspect-[1/1] rounded-full object-fit hover:scale-[108%] duration-200 ease-in-out" alt="" />
                    </Link>
                    <div className="flex flex-col sm:text-lg text-md ">
                        <h2 className='font-semibold'>{details?.channelInfo.name}</h2>
                        <h2>{formatNumber(details?.channelInfo.subCount)} subscribers</h2>
                    </div>
                </div>
                {/* Buttons */}
                <div className="flex gap-3 sm:text-lg text-md cursor-pointer sm:mt-0 mt-1">
                    <div className="flex items-center gap-2 bg-neutral-700 px-3 py-2 hover:bg-neutral-800 rounded-full">
                        <BiLike />
                        <span className='h-6 border'></span>
                        <span>{formatNumber(details?.videoLikes)}</span>
                    </div>
                    {/* Join Button */}
                    <Link 
                        to={`/channel/${details?.channelInfo.id}`} // Link to the channel page
                        className="flex items-center gap-2 bg-neutral-700 px-3 py-2 hover:bg-neutral-800 rounded-full">
                        <span>Join</span>
                    </Link>

                    {/* Share Button */}
                    <div className="relative">
                        <div 
                            onClick={handleShareClick} 
                            className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-800 px-3 py-2 rounded-full cursor-pointer">
                            <FaShare />
                            <span>Share</span>
                        </div>
                        {showShareOptions && (
                            <div className="absolute right-0 mt-2 w-48 bg-neutral-800 rounded-md shadow-lg z-10">
                                <button 
                                    onClick={handleCopyToClipboard} 
                                    className="block w-full text-left px-4 py-2 text-white hover:bg-neutral-700">
                                    Copy to Clipboard
                                </button>
                                <button 
                                    onClick={() => alert('Share on Facebook')} 
                                    className="block w-full text-left px-4 py-2 text-white hover:bg-neutral-700">
                                    Share on Facebook
                                </button>
                                <button 
                                    onClick={() => alert('Share on Twitter')} 
                                    className="block w-full text-left px-4 py-2 text-white hover:bg-neutral-700">
                                    Share on Twitter
                                </button>
                                {/* Add more sharing options as needed */}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="sm:text-lg text-md bg-neutral-700 px-3 py-2 rounded-xl">
                <p className={`whitespace-pre-line ${showDescription ? "" : "line-clamp-3"}`}>{details?.videoDescription}</p>
                {!showDescription ?
                    <button onClick={() => setShowDescription(true)} className="text-blue-500">...more</button> :
                    <button onClick={() => setShowDescription(false)} className="text-blue-500">...less</button>
                }
            </div>
        </div>
    )
}

export default VideoDetails