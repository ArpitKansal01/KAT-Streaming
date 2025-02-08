import { useState } from "react"
import axios from "axios"
import { ChannelInfoType, ChannelPlaylistsType, HomeVideoCardType } from "../utils/Types"
import { getActivities, getChannelInfo } from "../utils/api"
import { getActvitiesVideos, getChannelPlaylists } from "../utils/api"
import { fetchVideosWithChannels } from "../utils/videoDetailsHelper"
import { parseChannelPlaylists } from "../utils/parseData"

const API_KEY = import.meta.env.VITE_API_KEY

interface ChannelVideoListState {
    videos: HomeVideoCardType[],
    nextPageToken: string | null
}
interface ChannelPlayListState {
    playlists: ChannelPlaylistsType[],
    nextPageToken: string | null
}

export const useChannel = () => {
    const [category, setCategory] = useState("videos")
    const [channelInfo, setChannelInfo] = useState<ChannelInfoType | null>(null)
    const [channelVideoList, setChannelVideoList] = useState<ChannelVideoListState>({ videos: [], nextPageToken: null })
    const [channelPlayLists, setChannelPlayLists] = useState<ChannelPlayListState>({ playlists: [], nextPageToken: null })
    const [hasMore, setHasMore] = useState(true)

    const fetchChannelInfo = async (channelId: string) => {
        const channelInfoResponse = await getChannelInfo(channelId)

        const channelInfoData = {
            id: channelInfoResponse[0].id,
            thumbnail: channelInfoResponse[0].snippet.thumbnails.high.url,
            title: channelInfoResponse[0].snippet.title,
            customUrl: channelInfoResponse[0].snippet.customUrl,
            description: channelInfoResponse[0].snippet.description,
            subCount: channelInfoResponse[0].statistics.subscriberCount,
            videoCount: channelInfoResponse[0].statistics.videoCount,
        }

        // console.log("channelInfoData", channelInfoData)
        setChannelInfo(channelInfoData)

    }

    const fetchChanneldata = async (channelId: string, pageToken?: string) => {
        if (category == "videos") {

            const channelVideosResponse = await getActivities(channelId, channelVideoList!.nextPageToken!)
            console.log("channelVideosResponse", channelVideosResponse)
            const videoIds: string[] = []

            channelVideosResponse.items.forEach(
                (item: {
                    contentDetails: {
                        upload?: { videoId: string },
                        playlistItem?: { resourceId: { videoId: string } }
                    }
                }) => {
                    if (item.contentDetails.upload) {
                        videoIds.push(item.contentDetails.upload.videoId)
                    }
                    else if (item.contentDetails.playlistItem) {
                        videoIds.push(item.contentDetails.playlistItem.resourceId.videoId)
                    }
                }
            )

            const vidResponse = await getActvitiesVideos(videoIds!)

            const videosArray = await fetchVideosWithChannels(vidResponse.items)

            setChannelVideoList(prev => ({
                videos: [...prev.videos, ...videosArray],
                nextPageToken: channelVideosResponse.nextPageToken
            }))

            setHasMore(Boolean(channelVideosResponse.nextPageToken))
            // console.log(videosArray)

        } else {
            const channelPlaylistsResponse = await getChannelPlaylists(channelId!, channelPlayLists!.nextPageToken!)

            const channelPlaylistsData = parseChannelPlaylists(channelPlaylistsResponse.items)

            console.log("channelPlaylistsData", channelPlaylistsData)
            setChannelPlayLists(prev => ({
                playlists: [...prev.playlists, ...channelPlaylistsData],
                nextPageToken: channelPlaylistsResponse.nextPageToken
            }))

            setHasMore(Boolean(channelPlaylistsResponse.nextPageToken))

        }

    }

    return { category, setCategory, channelInfo, fetchChannelInfo, channelVideoList, channelPlayLists, fetchChanneldata, hasMore }

}