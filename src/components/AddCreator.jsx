import React, { useState, useEffect } from "react";
import { Input, Button, Box, Image, Flex } from "@chakra-ui/react";
import eventsData from "../../events.json";

const AddCreator = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const [lastUserId, setLastUserId] = useState(0);

  useEffect(() => {
    fetchLastUserId();
  }, []);

  const fetchLastUserId = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      if (response.ok) {
        const users = await response.json();
        const maxId = Math.max(...users.map((user) => user.id));
        setLastUserId(maxId);
      } else {
        throw new Error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const finalImage =
        image ||
        "https://images.pexels.com/photos/8490225/pexels-photo-8490225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

      const userId = lastUserId + 1;

      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId, name, image: finalImage }),
      });

      if (response.ok) {
        setLastUserId(userId);
        window.location.href = "/creators";
      } else {
        throw new Error("Failed to add user");
      }
    } catch (error) {
      setError(
        "An error occurred while adding the user. Please try again later."
      );
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1 style={{ fontSize: "1rem", fontWeight: "bold", color: "#333" }}>
        New Creator
      </h1>
      {error && <p>{error}</p>}
      <Box maxWidth="400px" m="auto">
        <form onSubmit={handleSubmit}>
          <Flex justifyContent="space-between">
            <Box textAlign="left" flex="1">
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                marginBottom="1rem"
                borderColor="#ccc"
                borderRadius="4px"
                padding="0.5rem"
                placeholder="Name"
              />
            </Box>
            <Box textAlign="left" flex="1" ml="1rem">
              <Input
                type="text"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                marginBottom="1rem"
                borderColor="#ccc"
                borderRadius="4px"
                padding="0.5rem"
                placeholder="Image URL"
              />
            </Box>
          </Flex>
          <Button
            type="submit"
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
            Submit
          </Button>
        </form>
      </Box>
      {image && (
        <Box maxWidth="400px" m="auto" marginTop="1rem">
          <Image src={image} alt="Uploaded" width="200px" height="auto" />
        </Box>
      )}
      {Array.isArray(eventsData) &&
        eventsData.map((event) => (
          <Box key={event.id} maxWidth="400px" m="auto" marginTop="1rem">
            <Image
              src={event.image}
              alt={event.title}
              width="200px"
              height="200px"
            />
          </Box>
        ))}
    </div>
  );
};

export default AddCreator;
