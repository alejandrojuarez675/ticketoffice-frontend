export default function EventDetail  ({ eventData })  {
    const { description, generalInfo } = eventData;
    return (
        <div className="event-datails-container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div className="event-detail">
                <h2>Detalles del evento </h2>
                <p>{description}</p>
            </div>
            <div className="event-general-info">
                <h3>Información General</h3>
                <ol>
                    {generalInfo.map((info, index) => (
                        <li key={index}>{info}</li>
                    ))}
                </ol>
            </div>
        </div>
    );
}