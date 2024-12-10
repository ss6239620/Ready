import React from 'react'

export default function Underline({ color, sizeInPx, style }) {
    return (
        <div style={{ borderBottom: `${sizeInPx ? sizeInPx : 0.1}px solid ${color ? color : '#FFFFFF55'}`, ...style }} />

    )
}
