import { useState, useEffect } from 'react'
import { CommentBodyType } from '../utils/Types'
import CommentBody from './CommentBody'
import axios from 'axios'
import { getCommetReplies } from '../utils/api'
import { parseReplies } from '../utils/parseData'

const API_KEY = import.meta.env.VITE_API_KEY

function CommentCard({ comment }: { comment: CommentBodyType }) {

    const [replies, setReplies] = useState<CommentBodyType[]>([])

    const fetchreplies = async () => {
        try {
            if (comment.commentRepliesCount) {
                const repliesResponse = await getCommetReplies(comment.commentId)

                const repliesData = parseReplies(repliesResponse)

                setReplies(repliesData)
            }

        } catch (error) {
            console.error(`Error fetching the comment replies`)
        }
    }

    useEffect(() => {
        fetchreplies()
    }, [])


    return (
        <div className='flex flex-col gap-2'>
            <CommentBody item={comment} />
            <div className="px-14">
                {replies?.map((item: any, ind) =>
                    <CommentBody key={ind} item={item} />
                )}
            </div>
        </div>
    )
}

export default CommentCard