import React from "react";
import EventDetail from "@/components/EventDetail";

const EventPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // Simulate fetching event data based on the ID
  const eventData = {
    id,
    title: `Event ${id}`,
    description: `This is the detail of event ${id}.`,
    date: new Date().toLocaleDateString(),
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <EventDetail eventData={eventData} />
    </div>
  );
}

export default EventPage;