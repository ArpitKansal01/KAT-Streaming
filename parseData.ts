import { ChannelPlaylistsType, CommentBodyType, HomeVideoCardType } from "./Types";

export const parseVideos = (items: any[]): HomeVideoCardType[] => {
    return items.map((item: any) => ({
        videoId: item.id,
        videoTitle: item.snippet.title,
        videoDescription: item.snippet.description,
        videoThumbnail: item.snippet.thumbnails.standard?.url || item.snippet.thumbnails.default?.url,
        videoDuration: item.contentDetails.duration,
        videoViews: item.statistics.viewCount,
        videoLikes: item.statistics.likeCount,
        videoAge: item.snippet.publishedAt,
        channelInfo: {
            id: item.snippet.channelId,
            name: item.snippet.channelTitle,
        }
    }))
}

export const parseChannelPlaylists = ((items: any[]): ChannelPlaylistsType[] => {
    return items.map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high!.url! || item.snippet.thumbnails.standard!.url!,
        videoCount: item.contentDetails.itemCount
    }))
})

export const parseComments = (items: any[]): CommentBodyType[] => {
    return items.map((comment: any) => ({
        commentId: comment.id,
        authorChannelId: comment.snippet.topLevelComment.snippet.authorChannelId.value,
        authorProfile: comment.snippet.topLevelComment.snippet.authorProfileImageUrl,
        authorName: comment.snippet.topLevelComment.snippet.authorDisplayName,
        commentText: comment.snippet.topLevelComment.snippet.textOriginal,
        commentLikes: comment.snippet.topLevelComment.snippet.likeCount,
        commentRepliesCount: comment.snippet.totalReplyCount
    }))
}

export const parseReplies = (items: any[]): CommentBodyType[] => {
    return items.map((item: any) => ({
        commentId: item.id,
        authorChannelId: item.snippet.authorChannelId.value,
        authorProfile: item.snippet.authorProfileImageUrl,
        authorName: item.snippet.authorDisplayName,
        commentText: item.snippet.textOriginal,
        commentLikes: item.snippet.likeCount,
    }))
}

export const parsePlaylistInfo = (item: any) => ({
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.standard!.url! || item.snippet.thumbnails.high!.url!
})