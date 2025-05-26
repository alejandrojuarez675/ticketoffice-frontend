import React from "react";

export default function EventImages ({ images })  {
    return (
        <div className="event-images">
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Event Image ${index + 1}`}
                    className="event-image"
                />
            ))}
        </div>
    );
}
