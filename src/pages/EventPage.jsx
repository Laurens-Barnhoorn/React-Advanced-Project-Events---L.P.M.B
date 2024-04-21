import React, { useState, useEffect } from "react";
import {
  Heading,
  Text,
  Image,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import eventsData from "../../events.json";

const getCategoryNames = (categoryIds) => {
  return categoryIds.map((categoryId) => {
    const id = parseInt(categoryId);
    const category = eventsData.categories.find(
      (category) => category.id === id
    );
    return category ? category.name : "";
  });
};

const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);

  useEffect(() => {
    const selectedEvent = eventsData.events.find(
      (event) => event.id === parseInt(eventId)
    );
    setEvent(selectedEvent);
  }, [eventId]);

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
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedEvent),
      });

      if (response.ok) {
        alert("Event updated successfully");
        setEvent(editedEvent);
      } else {
        throw new Error("Failed to update event");
      }
    } catch (error) {
      alert("Failed to update event");
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
          alert("Event deleted successfully");
          navigate("/events");
        } else {
          throw new Error("Failed to delete event");
        }
      } catch (error) {
        alert("Failed to delete event");
      }
    }
  };

  if (!event) {
    return <Heading>Loading...</Heading>;
  }

  return (
    <>
      <Heading
        textAlign="center"
        mt={30}
        style={{ fontSize: "2rem", fontWeight: "bold" }}
      >
        {event.title}
      </Heading>
      <Text textAlign="center">Description: {event.description}</Text>
      <Text textAlign="center">Location: {event.location}</Text>
      <Text textAlign="center">
        Start Time: {new Date(event.startTime).toLocaleString()}
      </Text>
      <Text textAlign="center">
        End Time: {new Date(event.endTime).toLocaleString()}
      </Text>
      <Image src={event.image} alt={event.title} m="auto" display="block" />
      <Text textAlign="center">
        Categories: {getCategoryNames(event.categoryIds).join(", ")}
      </Text>

      <Text textAlign="center">
        Created by:{" "}
        {
          eventsData.users.find((user) => user.id === parseInt(event.createdBy))
            ?.name
        }
      </Text>
      <Image
        src={
          eventsData.users.find((user) => user.id === parseInt(event.createdBy))
            ?.image
        }
        alt="Creator"
        m="auto"
        display="block"
      />

      <Flex justifyContent="center" mt={4}>
        <Button
          onClick={toggleEdit}
          variant="outline"
          borderColor="#ccc"
          borderRadius="4px"
          padding="0.5rem"
          backgroundColor="#f5b042"
          color="#fff"
          cursor="pointer"
          margin="0 0.5rem"
        >
          Edit
        </Button>
        <Button
          colorScheme="red"
          onClick={handleDelete}
          variant="outline"
          borderColor="#ccc"
          borderRadius="4px"
          padding="0.5rem"
          backgroundColor="#f5b042"
          color="#fff"
          cursor="pointer"
          margin="0 0.5rem"
        >
          Delete
        </Button>
      </Flex>

      {isEditing && (
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
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
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input
              type="text"
              name="location"
              value={editedEvent.location}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Start Time</FormLabel>
            <Input
              type="datetime-local"
              name="startTime"
              value={editedEvent.startTime}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>End Time</FormLabel>
            <Input
              type="datetime-local"
              name="endTime"
              value={editedEvent.endTime}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input
              type="text"
              name="image"
              value={editedEvent.image}
              onChange={handleInputChange}
            />
          </FormControl>

          <Button
            mt={4}
            variant="outline"
            borderColor="#ccc"
            borderRadius="4px"
            padding="0.5rem"
            backgroundColor="#f5b042"
            color="#fff"
            cursor="pointer"
            margin="1rem"
            type="submit"
          >
            Save
          </Button>
        </form>
      )}
    </>
  );
};

export default EventPage;
