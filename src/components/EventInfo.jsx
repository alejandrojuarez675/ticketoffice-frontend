import React from "react";

export default function EventInfo  ({ title, date, location, ageRestriction, time, price })  {
    return (
        <div className="event-info">
            <h2>{title}</h2>
            <p><strong>Fecha:</strong> {date} (HORA LOCAL) </p>
            <p><strong>Location:</strong> {location}</p>
            <p><strong>Age Restriction:</strong> {ageRestriction}</p>
            <p>Hora de inicio: {time}</p>
            <label htmlFor="ticket-type">Seleccione tipo de entrada:</label>
            <select id="ticket-type">
                <option value={`$${price}`}>${price}</option>
            </select>
            <button>Buy Ticket</button>
        </div>
    )
}
