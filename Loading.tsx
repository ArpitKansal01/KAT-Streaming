import React from 'react'

function Loading() {
    return (
        <div className='flex w-full my-8'>
            <div className="w-10 h-10 mx-auto border-3 border-red-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
    )
}

export default Loading