import React from "react";
import EventImages from "./EventImages";
import EventInfo from "./EventInfo";
import "../styles/EventDetail.module.css"; // Assuming you have a CSS file for styling

const EventDetail = ({ eventData }) => {
    const { title, date, location, ageRestriction, time, price, images, description } = eventData;
    return (
        <div className="event-detail">
            <h2 className="event-title">{title}</h2>
            <EventImages images={images} />
            <EventInfo
                date={date}
                location={location}
                ageRestriction={ageRestriction}
                time={time}
                price={price}
            />
            <p className="event-description">{description}</p>
        </div>
    );
}

export default EventDetail;