import GifPicker from 'gif-picker-react'
import React from 'react'
import { TENOR_API_KEY } from '../../constant'

export default function GifInput() {
    function handleGifClick(gif) {
        console.log(gif);
    }
    return (
        <div>
            <GifPicker tenorApiKey={TENOR_API_KEY} theme='dark' onGifClick={handleGifClick} />
        </div>
    )
}
