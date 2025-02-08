import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { ChannelInfoType } from '../utils/Types'
import { useChannel } from '../Hooks/useChannel'
import { AiOutlineClose } from "react-icons/ai";
import ChannelVideoList from '../Components/ChannelVideoList'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from '../Components/Loading'
import ChannelPlaylist from '../Components/ChannelPlaylist'
import { getChannelPlaylists } from '../utils/api'



function Channel() {

    const formatNumber = (num) => {
        if (num >= 1e6) {
          return (num / 1e6).toFixed(1) + 'M';
        } else if (num >= 1e3) {
          return (num / 1e3).toFixed(1) + 'K';
        }
        return num;
      };

    const { channelId } = useParams()
    const { category, setCategory, channelInfo, fetchChannelInfo, channelVideoList, channelPlayLists, fetchChanneldata, hasMore } = useChannel()
    const [showDesc, setShowDesc] = useState(false)

    const fetchMoreChanneldata = () => {
        fetchChanneldata(channelId!, channelVideoList!.nextPageToken!)
    }

    useEffect(() => {
        fetchChannelInfo(channelId!)
        fetchChanneldata(channelId!)
    }, [category])

    return (
        <div className="relative mb-12">
            {/* modal */}
            {showDesc && channelInfo?.description &&
                <div className="z-[10] absolute overflow-hidden bg-neutral-800 rounded-xl left-1/2 top-14 transform -translate-x-1/2">

                    <div className="flex flex-col gap-2 items-end w-[600px] max-h-[500px] p-8 overflow-y-auto">
                        <div className="">
                            <AiOutlineClose
                                onClick={() => setShowDesc(false)}
                                className='text-2xl text-neutral-200' />
                        </div>
                        <p className='text-lg whitespace-pre-line'>{channelInfo?.description}</p>
                    </div>
                </div>
            }


            <InfiniteScroll
                next={() => fetchMoreChanneldata()}
                hasMore={hasMore}
                dataLength={channelVideoList.videos.length}
                loader={<Loading />}
            >
                <div className='w-[95%] mx-auto md:mt-8 mt-6'>
                    <div className="row row-cols-2">
                        {/* image */}
                        <div className="col-4">
                            <img src={channelInfo?.thumbnail} className="md:w-52 sm:w-40 w-36 aspect-[1/1] object-cover rounded-full mx-auto" alt="" />
                        </div>
                        {/*details */}
                        <div className="col-8">
                            <h1 className='md:text-4xl sm:text-3xl text-2xl font-semibold'>{channelInfo?.title}</h1>
                            <div className="sm:flex gap-4 sm:text-lg text-md text-neutral-400 mt-2">
                                <h2>{channelInfo?.customUrl}</h2>
                                <h2>{formatNumber(channelInfo?.subCount)} Subscribers</h2>
                                <h2>{formatNumber(channelInfo?.videoCount)} Vidoes</h2>
                            </div>
                            {channelInfo?.description &&
                                <div className="">
                                    <p className='w-[600px] line-clamp-3 text-neutral-400 whitespace-pre-line'>{channelInfo?.description}</p>
                                    <button
                                        onClick={() => setShowDesc(true)}
                                        className='font-semibold'>more</button>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="sm:my-3 my-1 ">
                        <button
                            onClick={() => setCategory("videos")}
                            className={`md:w-44 w-32 sm:text-xl text-lg  py-2 font-semibold ${category == "videos" ? "border-b" : ""}`}>Vidoes</button>
                        <button
                            onClick={() => setCategory("playlists")}
                            className={`md:w-44 w-32 sm:text-xl text-lg py-2 font-semibold ${category == "playlists" ? "border-b" : ""}`}>Playlists</button>
                        <hr className='h-1' />
                    </div>

                    {category == "videos"
                        ? <ChannelVideoList channelVideos={channelVideoList!.videos} />
                        : <ChannelPlaylist channelId={channelInfo!.id} channelPlayLists={channelPlayLists!.playlists} />
                    }
                </div>
            </InfiniteScroll>
        </div >
    )
}

export default Channel