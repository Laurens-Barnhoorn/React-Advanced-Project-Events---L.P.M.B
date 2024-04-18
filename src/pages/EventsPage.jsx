import React, { useEffect, useState } from "react";
import { Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import eventsData from "../../events.json";

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(eventsData.events);
  }, []);

  return (
    <>
      <Heading>List of Events</Heading>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <Link to={`/event/${event.id}`}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default EventsPage;
