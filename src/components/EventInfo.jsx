export default function EventInfo({ title, date, location, ageRestriction, time, price }) {
    return (
        <div className="event-info p-4 bg-white rounded-lg shadow-lg mt-4">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600"><strong>Fecha:</strong> {date} (HORA LOCAL)</p>
            <p className="text-gray-600"><strong>Ubicación:</strong> {location}</p>
            <p className="text-gray-600"><strong>Edad Mínima:</strong> {ageRestriction} años</p>
            <p className="text-gray-600"><strong>Hora de inicio:</strong> {time}</p>
            <label htmlFor="ticket-type" className="block mt-2">Seleccione tipo de entrada:</label>
            <select id="ticket-type" className="border border-gray-300 rounded-md p-2 mt-1 mb-4">
                <option value={`${price}`}>${price}</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">Buy Ticket</button>
        </div>
    );
}