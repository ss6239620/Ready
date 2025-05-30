import React from 'react'

export default function QueueClean() {
    return (
        <div className='divider-top py-4 div-center-justify-center'>
            <div className='flex flex-col items-center'>
                <img
                    src={require('../../../../asset/img/rusty.png')}
                    alt=""
                    className="size-[200px] object-contain"
                />
                <h1 className='extra-large-text-large-weight !my-0'>Queue is Clean</h1>
                <p className='medium-text-small-weight !my-0 text-[var(--text-secondary)]'>Rusty is pleased.</p>
            </div>
        </div>
    )
}
