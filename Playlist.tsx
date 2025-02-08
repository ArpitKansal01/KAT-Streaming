import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPlaylistInfo, getPlaylistVideos } from '../utils/api'
import { PlaylistInfoType, PlaylistVideotype } from '../utils/Types'
import { AiOutlineClose } from "react-icons/ai";
import { usePlaylistInfo } from '../Hooks/usePlaylistInfo';
import { FaList } from "react-icons/fa";
import { usePlaylistItems } from '../Hooks/usePlaylistItems';
import PlaylistItems from '../Components/PlaylistItems';

function Playlist() {
    const { channelId, playlistId } = useParams()
    const { playListInfo, showDesc, setShowDesc, fetchPlaylistInfo } = usePlaylistInfo()
    const { playlistItems, fetchPlaylistVideos } = usePlaylistItems()


    useEffect(() => {
        fetchPlaylistInfo(playlistId!)
        fetchPlaylistVideos(playlistId!)
    }, [])


    return (
        <div className="relative">

            {/* modal */}
            {
                showDesc && playListInfo?.description &&
                <div className="z-[10] absolute overflow-hidden bg-neutral-800 rounded-xl left-1/2 top-14 transform -translate-x-1/2">

                    <div className="flex flex-col gap-2 items-end w-[600px] max-h-[500px] p-8 overflow-y-auto">
                        <div className="">
                            <AiOutlineClose
                                onClick={() => setShowDesc(false)}
                                className='text-2xl text-neutral-200' />
                        </div>
                        <p className='text-lg whitespace-pre-line'>{playListInfo?.description}</p>
                    </div>
                </div>
            }

            <div className='w-[90%] mx-auto ms:mt-8 mt-4'>
                <div className="row row-cols-2 bg-neutral-900 md:p-5 p-3 rounded-xl">
                    {/* image */}
                    <div className="col-md-4 col-12">
                        <img src={playListInfo?.thumbnail} className="aspect-[16/9] object-cover mx-auto bg-neutral-900" alt="" />
                    </div>
                    {/*details */}
                    <div className="col-md-8 col-12 flex flex-col gap-2">
                        <h1 className='md:text-4xl sm:text-3xl text-2xl font-semibold'>{playListInfo?.title}</h1>

                        {playListInfo?.description &&
                            <div className="">
                                <p className='line-clamp-3 text-neutral-400 whitespace-pre-line'>{playListInfo?.description}</p>
                                <button
                                    onClick={() => setShowDesc(true)}
                                    className='font-semibold'>more</button>
                            </div>
                        }
                    </div>
                </div>

                <PlaylistItems videos={playlistItems.videos} channelId={channelId!} />

            </div>
        </div>
    )
}

export default Playlist