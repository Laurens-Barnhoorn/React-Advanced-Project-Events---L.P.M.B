import React from "react";
import { Link } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";

const Navigation = () => {
  return (
    <Box
      bg="rgba(255, 255, 255, 0.8)"
      bgImage="url('https://images.pexels.com/photos/1996035/pexels-photo-1996035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      p={4}
      mb={8}
      borderRadius="md"
      boxShadow="md"
      position="fixed"
      top="20px"
      left="50%"
      transform="translateX(-50%)"
      width="75%"
      zIndex="9999"
    >
      <Flex direction="column" alignItems="center" textAlign="center">
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#f5b042" }}>
          Eventually Events
        </h1>
        <Flex justifyContent="center" gap="1rem">
          <Link to="/" style={{ color: "#b5ba18" }}>
            Home
          </Link>
          <Link to="/events" style={{ color: "#b5ba18" }}>
            Events
          </Link>
          <Link to="/add-event" style={{ color: "#b5ba18" }}>
            Add Event
          </Link>
          <Link to="/creators" style={{ color: "#b5ba18" }}>
            Creators
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navigation;
