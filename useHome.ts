import { useState } from "react"
import { HomeVideoCardType } from "../utils/Types"
import axios from "axios"
import { fetchVideosWithChannels } from "../utils/videoDetailsHelper"
import { getHomeVideos } from "../utils/api"

const API_KEY = import.meta.env.VITE_API_KEY

export const useHome = () => {

    interface HomeHookPropType {
        videos: HomeVideoCardType[],
        nextPageToken: string | null
    }

    const [homeVideos, setHomeVideos] = useState<Record<string, HomeHookPropType>>(
        {
            home: { videos: [], nextPageToken: null },
            music: { videos: [], nextPageToken: null },
            sport: { videos: [], nextPageToken: null },
            gaming: { videos: [], nextPageToken: null },
            movies: { videos: [], nextPageToken: null },
            news: { videos: [], nextPageToken: null },
            fashion: { videos: [], nextPageToken: null },
            course: { videos: [], nextPageToken: null }

        })
    const [error, setError] = useState<string | null>(null)

    const fetchHomeVideos = async (filter: string, categoryId: string | null, pageToken: string | null) => {
        try {
            const response = await getHomeVideos(categoryId!, pageToken!)
            // console.log(response)
            setError(null)

            const videos = await fetchVideosWithChannels(response.items)

            setHomeVideos(prev => ({
                ...prev,
                [filter]: {
                    videos: [...prev[filter].videos, ...videos],
                    nextPageToken: response.nextPageToken
                }
            }))

        } catch (error) {
            console.error(`Error fetching ${filter} videos:`, error)
            setError(`Error fetching the ${filter} videos, fetch again later.`)
        }

    }

    return { homeVideos, error, fetchHomeVideos }


}