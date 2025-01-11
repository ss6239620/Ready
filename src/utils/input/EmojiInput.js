import React from 'react'
import EmojiPicker from 'emoji-picker-react';
import { useUser } from '../../Context/UserContext';

export default function EmojiInput({ replyComment, setReplyComment }) {
    function handleEmojiClick(emojiObject) {
        setReplyComment((prev) => ({
            ...prev,
            replyToCommentText: prev.replyToCommentText + emojiObject.emoji,
        }));
    }
    const { theme } = useUser();

    return (
        <div>
            <EmojiPicker theme={theme} onEmojiClick={handleEmojiClick} emojiStyle='native' skinTonesDisabled lazyLoadEmojis />
        </div>
    )
}
