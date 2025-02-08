import React from 'react'
import { BiLike } from "react-icons/bi";
import { CommentBodyType } from '../utils/Types';

function CommentBody({ item }: { item: CommentBodyType }) {
    return (
        <div className="flex sm:gap-3 gap-2">
            <img src={item.authorProfile} className="bg-bg-neutral-900 sm:w-10 w-9 h-fit aspect-[1/1] rounded-full" alt="" />
            <div className="">
                <h1 className='text-md'>{item.authorName}</h1>
                <h2 className='text-neutral-300 whitespace-pre-line'>{item.commentText}</h2>
                <div className="flex items-center text-neutral-400 gap-1 cursor-pointer">
                    <BiLike />
                    {item.commentLikes}
                </div>
            </div>
        </div>)
}

export default CommentBody