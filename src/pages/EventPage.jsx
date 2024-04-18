import React, { useState } from "react";
import {
  Heading,
  Text,
  Image,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useParams, useHistory } from "react-router-dom";
import eventsData from "../../events.json";

const getCategoryName = (categoryId) => {
  const category = eventsData.categories.find(
    (category) => category.id === categoryId
  );
  return category ? category.name : "";
};

const EventPage = () => {
  const { eventId } = useParams();
  const history = useHistory();
  const [event, setEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);
  const toast = useToast();

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedEvent({ ...event });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setEvent(editedEvent);

      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedEvent),
      });

      if (response.ok) {
        toast({
          title: "Event updated",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error("Failed to update event");
      }
    } catch (error) {
      toast({
        title: "Failed to update event",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/events/${eventId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          toast({
            title: "Event deleted",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          history.push("/events");
        } else {
          throw new Error("Failed to delete event");
        }
      } catch (error) {
        toast({
          title: "Failed to delete event",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const selectedEvent = eventsData.events.find(
    (event) => event.id === parseInt(eventId)
  );

  useState(() => {
    setEvent(selectedEvent);
  }, [selectedEvent]);

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
      <Image src={event.image} alt={event.title} />
      <Text>
        Categories:{" "}
        {event.categoryIds
          .map((categoryId) => getCategoryName(categoryId))
          .join(", ")}
      </Text>
      <Text>
        Created by:{" "}
        {eventsData.users.find((user) => user.id === event.createdBy)?.name}
      </Text>
      <Image
        src={
          eventsData.users.find((user) => user.id === event.createdBy)?.image
        }
        alt="Creator"
      />

      <Button onClick={toggleEdit}>Edit</Button>

      <Button colorScheme="red" onClick={handleDelete}>
        Delete
      </Button>

      {isEditing && (
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              name="title"
              value={editedEvent.title}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              name="description"
              value={editedEvent.description}
              onChange={handleInputChange}
            />
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">
            Save
          </Button>
        </form>
      )}
    </>
  );
};

export default EventPage;
