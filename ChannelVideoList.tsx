import React from 'react'
import ChannelVideoCard from './ChannelVideoCard'
import { HomeVideoCardType } from '../utils/Types'

function ChannelVideoList({ channelVideos }: { channelVideos?: HomeVideoCardType[] }) {
    return (
        <div className="row row-cols-lg-4 row-cols-md-3 row-cols-2 gap-y-4">
            {channelVideos &&
                channelVideos.map((item: HomeVideoCardType, ind) =>
                    <ChannelVideoCard key={ind} item={item} />
                )
            }
        </div>
    )
}

export default ChannelVideoList