import React from "react";
import { Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import eventsData from "../events.json";

const EventPage = () => {
  const { eventId } = useParams();
  const event = eventsData.events.find(
    (event) => event.id === parseInt(eventId)
  );

  if (!event) {
    return <Heading>Loading...</Heading>;
  }

  return (
    <>
      <Heading>{event.title}</Heading>
      <Text>Description: {event.description}</Text>
      <Text>Location: {event.location}</Text>
      <Text>Start Time: {new Date(event.startTime).toLocaleString()}</Text>
      <Text>End Time: {new Date(event.endTime).toLocaleString()}</Text>
    </>
  );
};

export default EventPage;
