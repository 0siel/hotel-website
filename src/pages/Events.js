import React, { useState, useEffect } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch events from the API
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://3.93.234.131/api/events/");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p className="text-center text-green">Loading events...</p>;
  }

  return (
    <section className="bg-white py-8">
      <h2 className="text-3xl text-green font-bold text-center mb-6">
        Upcoming Events
      </h2>
      <div className="overflow-x-auto whitespace-nowrap">
        <div className="flex gap-6 px-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="min-w-[300px] bg-green text-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-sm mb-2">{event.description}</p>
                <p className="text-sm">
                  <span className="font-bold">Date:</span> {event.date}
                </p>
                <p className="text-sm">
                  <span className="font-bold">Time:</span> {event.time}
                </p>
                <p className="text-sm">
                  <span className="font-bold">Location:</span> {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;