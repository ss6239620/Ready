import GifPicker from 'gif-picker-react'
import React from 'react'
import { TENOR_API_KEY } from '../../constant'
import { useUser } from '../../Context/UserContext';

export default function GifInput() {
    function handleGifClick(gif) {
        console.log(gif);
    }
    const { theme } = useUser();

    return (
        <div>
            <GifPicker tenorApiKey={TENOR_API_KEY} theme={theme} onGifClick={handleGifClick} />
        </div>
    )
}
