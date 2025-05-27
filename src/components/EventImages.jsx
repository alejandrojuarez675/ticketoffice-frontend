export default function EventImages({ images }) {
    return (
        <div className="event-images overflow-hidden">
            <div className="flex space-x-4">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Event Image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg shadow-lg"
                    />
                ))}
            </div>
        </div>
    );
}
