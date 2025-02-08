import { useState, useEffect } from 'react'
import CommentBody from './CommentBody'
import axios from 'axios'
import { CommentBodyType } from '../utils/Types'
import CommentCard from './CommentCard'
import { getVideoComments } from '../utils/api'
import { parseComments } from '../utils/parseData'

const API_KEY = import.meta.env.VITE_API_KEY

interface CommentState {
    comments: CommentBodyType[],
    nextPageToken: string | null
}

function Comments({ videoId }: { videoId?: string }) {
    const [commentList, setCommentList] = useState<CommentState>({ comments: [], nextPageToken: null })

    const fetchComments = async () => {
        try {
            const commentsResponse = await getVideoComments(videoId!, commentList!.nextPageToken!)
            // console.log(commentsResponse.data)
            const items = commentsResponse.items

            const commetsData = parseComments(items)

            setCommentList(prev => ({
                comments: [...prev.comments, ...commetsData],
                nextPageToken: commentsResponse.nextPageToken
            }))

        } catch (error) {
            console.error(`Error fetching the comments`)
        }
    }

    useEffect(() => {
        if (videoId) {
            fetchComments()
        }
    }, [videoId])


    return (
        <div className='mt-3 flex flex-col gap-2'>
            <h1 className='md:text-2xl sm:text-xl text-lg font-semibold px-4'>Comments</h1>
            {
                commentList?.comments?.map((comment: any, ind) =>
                    <CommentCard key={ind} comment={comment} />
                )
            }
            <button className='text-gray-400 hover:underline'
                onClick={() => fetchComments()}
            >Show more...</button>

        </div>
    )
}

export default Comments