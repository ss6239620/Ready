import React from 'react'

export default function Underline({ color, sizeInPx, style,className }) {
    return (
        <div className={`${className}`} style={{ borderBottom: `${sizeInPx ? sizeInPx : 0.1}px solid var(--divider)`, ...style }} />
    )
}
