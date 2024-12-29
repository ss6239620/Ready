import React from 'react'
import EmojiPicker from 'emoji-picker-react';

export default function EmojiInput({ replyComment, setReplyComment }) {
    function handleEmojiClick(emojiObject) {
        setReplyComment((prev) => ({
            ...prev,
            replyToCommentText: prev.replyToCommentText + emojiObject.emoji,
        }));
    }


    return (
        <div>
            <EmojiPicker theme='dark' onEmojiClick={handleEmojiClick} emojiStyle='native' skinTonesDisabled lazyLoadEmojis />
        </div>
    )
}
