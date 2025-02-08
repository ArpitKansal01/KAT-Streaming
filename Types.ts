export interface HomeVideoCardType {
    videoId: string
    videoTitle: string
    videoDescription: string,
    videoThumbnail: string
    videoDuration: string
    videoViews: string
    videoLikes: string,
    videoAge: string
    channelInfo: {
        id: string
        image?: string
        name: string
        subCount?: string
    }
}

export interface CommentBodyType {
    commentId: string,
    authorChannelId: string,
    authorProfile: string,
    authorName: string,
    commentText: string,
    commentLikes: string,
    commentRepliesCount?: string
}

export interface ChannelInfoType {
    id: string,
    thumbnail: string,
    title: string,
    customUrl: string,
    description: string,
    subCount: string,
    videoCount: string,
}

export interface ChannelPlaylistsType {
    id: string,
    title: string,
    thumbnail: string,
    videoCount: string
}

export interface PlaylistInfoType {
    id: string
    title: string,
    description: string,
    thumbnail: string
}

export interface PlaylistVideotype {
    id: string,
    title: string,
    thumbnail: string
}