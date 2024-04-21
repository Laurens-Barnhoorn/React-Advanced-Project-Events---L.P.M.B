import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Container, CSSReset } from "@chakra-ui/react";
import Navigation from "./components/Navigation";
import EventsPage from "./pages/EventsPage";
import EventPage from "./pages/EventPage";
import AddEvent from "./components/AddEvent";
import EntryPage from "./pages/EntryPage";
import EventCreatorsPage from "./pages/CreatorPage";

const App = () => {
  return (
    <Router>
      <CSSReset />
      <Box
        bgImage="url('https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
        bgSize="cover"
        bgPosition="center"
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Container maxW="75%" minW="75%">
          {" "}
          <Navigation />
          <Box
            bg="rgba(255, 255, 255, 0.8)"
            p={8}
            borderRadius="md"
            boxShadow="md"
            maxHeight="80vh"
            overflowY="auto"
            maxWidth="100%"
            margin="0 auto"
          >
            <Routes>
              <Route path="/" element={<EntryPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/event/:eventId" element={<EventPage />} />
              <Route path="/add-event" element={<AddEvent />} />
              <Route path="/creators" element={<EventCreatorsPage />} />
            </Routes>
          </Box>
        </Container>
      </Box>
    </Router>
  );
};

export default App;
