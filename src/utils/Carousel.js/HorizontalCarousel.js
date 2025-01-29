import React, { useEffect, useState } from 'react';

export default function HorizontalCarousel({ items, renderItem, style,className }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState(4); // Default to 4 visible items

    // Calculate the number of slides
    const slides = [];
    for (let i = 0; i < items.length; i += visibleItems) {
        slides.push(items.slice(i, i + visibleItems));
    }

    const handleNext = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, slides.length - 1));
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    // Dynamically adjust the number of visible items based on screen width
    useEffect(() => {
        const updateVisibleItems = () => {
            const width = window.innerWidth;
            if (width > 1200) setVisibleItems(4);
            else if (width > 800) setVisibleItems(3);
            else setVisibleItems(2);
        };

        updateVisibleItems();
        window.addEventListener('resize', updateVisibleItems);
        return () => window.removeEventListener('resize', updateVisibleItems);
    }, []);

    return (
        <div className={`${className} w-[100%] overflow-hidden `} style={{ ...style }}>
            {/* Previous button */}
            {currentIndex > 0 && (
                <button
                    onClick={handlePrev}
                    className='absolute top-[50%] left-3 bg-black/[.5] text-[#fff]  '
                    style={{
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        border: 'none',
                        fontSize: '20px',
                        cursor: 'pointer',
                        padding: '9px',
                        borderRadius: '50%',
                        zIndex: 2,
                    }}
                >
                    ❮
                </button>
            )}

            {/* Carousel slides */}
            <div
            className='flex gap-3'
                style={{
                    transition: 'transform 0.3s ease',
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
                {slides.map((slide, slideIndex) => (
                    <div
                        key={slideIndex}
                        className='flex flex-shrink-0 w-[100%] gap-3'
                    >
                        {slide.map((item, index) => renderItem(item, index))}
                    </div>
                ))}
            </div>

            {/* Next button */}
            {currentIndex < slides.length - 1 && (
                <button
                    onClick={handleNext}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: '10px',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        border: 'none',
                        fontSize: '20px',
                        cursor: 'pointer',
                        padding: '9px',
                        borderRadius: '50%',
                        zIndex: 2,
                    }}
                >
                    ❯
                </button>
            )}
        </div>
    );
}
