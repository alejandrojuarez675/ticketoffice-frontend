'use client';
import React, { useState } from 'react';

export default function EventImages({ images, eventId }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevious = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
    };

    return (
        <div className="relative overflow-hidden">
            <img
                src={images[currentIndex]}
                alt={`Event Image ${currentIndex + 1}`}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
                onClick={() => {
                    window.location.href = `/main/events/${eventId}`;
                }}
            />
            {/* Carousel Controls */}
            <button
                onClick={handlePrevious}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200"
            >
                &#8592; {/* Left Arrow */}
            </button>
            <button
                onClick={handleNext}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200"
            >
                &#8594; {/* Right Arrow */}
            </button>
        </div>
    );
}