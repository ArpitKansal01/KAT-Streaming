import React from 'react'
import { Link } from 'react-router-dom'
import { HomeVideoCardType } from '../utils/Types'

function Card({ data }: { data: HomeVideoCardType }) {

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
        <div className='flex flex-col gap-3 pb-3 hover:scale-[101%] duration-200 ease-in-out'>
            {/* Thumbnail */}
            <div className="relative">
                <Link to={`/watch/${data.videoId}/${data.channelInfo.id}`}>
                    <img src={data.videoThumbnail} className="aspect-[16/9] w-full object-cover rounded-xl bg-neutral-900" alt="" />
                </Link>
                <span className='absolute sm:bottom-3 bottom-2 sm:right-3 right-2 text-sm bg-[#0c0c0cd0] px-2 py-0.5 rounded'>{parseISODuration(data.videoDuration)}</span>
            </div>
            {/* details */}
            <div className="flex gap-2 ">
                <Link to={`/channel/${data.channelInfo.id}`}
                    className=' md:h-10 h-8 aspect-[1/1]'>
                    <img src={data.channelInfo.image}
                        alt="" className="bg-gray-300 rounded-full object-cover hover:scale-[108%] duration-200 ease-in-out" />
                </Link>
                <div className="flex flex-col">
                    <h3 className='sm:text-lg text-md line-clamp-2'>{data.videoTitle}</h3>
                    <div className="sm:text-md text-sm">
                        <h4>{data.channelInfo.name}</h4>
                        <div className="flex gap-1">
                            <span>{formatViews(data.videoViews)}</span>
                            <span>.</span>
                            <span>{formatDate(data.videoAge)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card