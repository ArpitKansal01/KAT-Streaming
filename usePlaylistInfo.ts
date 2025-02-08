import { useState } from "react"
import { PlaylistInfoType } from "../utils/Types"
import { getPlaylistInfo } from "../utils/api"
import { parsePlaylistInfo } from "../utils/parseData"

export const usePlaylistInfo = () => {
    const [playListInfo, setPlaylistInfo] = useState<PlaylistInfoType | null>()
    const [showDesc, setShowDesc] = useState(false)

    const fetchPlaylistInfo = async (playlistId: string) => {
        const playlistInfoResponse = await getPlaylistInfo(playlistId)

        const PlaylistInfoData = parsePlaylistInfo(playlistInfoResponse)

        setPlaylistInfo(PlaylistInfoData)
    }

    return { playListInfo, showDesc, setShowDesc, fetchPlaylistInfo }
}