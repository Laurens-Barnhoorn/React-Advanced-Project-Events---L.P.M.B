import React, { useEffect, useState } from "react";
import { Heading, Input, Stack, Select, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import eventsData from "../../events.json";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setEvents(eventsData.events);
  }, []);

  const filteredEvents = events
    .filter((event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (event) =>
        !selectedCategory ||
        event.categoryIds.includes(parseInt(selectedCategory))
    );

  const categories = [{ id: "", name: "All" }, ...eventsData.categories];

  return (
    <Stack spacing={4} align="center">
      <Heading style={{ fontSize: "2rem", fontWeight: "bold", color: "#333" }}>
        List of Events
      </Heading>
      <Stack direction="row" spacing={4} align="center">
        <Input
          placeholder="Search events by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          placeholder="Filter by category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </Stack>
      <ul style={{ listStyle: "none", textAlign: "center" }}>
        {filteredEvents.map((event) => (
          <li key={event.id}>
            <Link to={`/event/${event.id}`} style={{ color: "#ba7718" }}>
              {event.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/add-event">
        <Link to="/add-event">
          <Button
            marginBottom="1rem"
            backgroundColor="#f5b042"
            color="#fff"
            cursor="pointer"
            border="1px solid #ccc"
            borderRadius="4px"
            padding="0.5rem"
            display="block"
            margin="0 auto"
          >
            Add Event
          </Button>
        </Link>
      </Link>
    </Stack>
  );
};

export default EventsPage;
