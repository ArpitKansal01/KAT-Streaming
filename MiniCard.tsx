import React from 'react'
import { HomeVideoCardType } from '../utils/Types'
import { Link } from 'react-router-dom'

function MiniCard({ item }: { item: HomeVideoCardType }) {

    // Utility function to format the date
const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Utility function to format views
  const formatViews = (views: string) => {
    const numViews = parseInt(views, 10);
    if (numViews >= 1e6) {
      return (numViews / 1e6).toFixed(1) + 'M'; // e.g., 1.2M
    } else if (numViews >= 1e3) {
      return (numViews / 1e3).toFixed(1) + 'K'; // e.g., 1.2K
    }
    return numViews.toString(); // e.g., 999
  };
  
  // Utility function to parse ISO 8601 duration and convert to H:MM:SS
  const parseISODuration = (duration: string) => {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/; // Regex to capture hours, minutes, and seconds
    const matches = duration.match(regex);
  
    if (!matches) {
      return '0:00'; // Return default if invalid format
    }
  
    const hours = parseInt(matches[1] || '0', 10);
    const minutes = parseInt(matches[2] || '0', 10);
    const seconds = parseInt(matches[3] || '0', 10);
  
    // Format to H:MM:SS or MM:SS if hours are 0
    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    } else {
      return `${minutes}:${String(seconds).padStart(2, '0')}`;
    }
  };

    return (
        <Link to={`/watch/${item.videoId}/${item.channelInfo.id}`}>
            <div className='flex gap-3 hover:scale-[101%] duration-200 ease-in-out'>
                <div className="relative min-w-fit">
                    <span className='sm:text-md text-sm absolute bottom-1 right-1 bg-[#0c0c0cd0] px-2 py-0.5 rounded'>{parseISODuration(item.videoDuration)}</span>
                    <img src={item.videoThumbnail} className='w-40 aspect-[16/9] object-cover rounded' alt="" />
                </div>
                <div className="">
                    <h1 className='text-md'>{item.videoTitle}</h1>
                    <div className="text-sm text-gray-400">
                        <h2>{item.channelInfo.name}</h2>
                        <div className="flex gap-1 items-center">
                            <h2>{formatViews(item.videoViews)}</h2>
                            <span className='w-[4px] h-[4px] bg-gray-400 '></span>
                            <h2>{formatDate(item.videoAge)}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default MiniCard