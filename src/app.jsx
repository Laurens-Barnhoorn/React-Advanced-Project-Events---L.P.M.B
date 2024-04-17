import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import EventsPage from "./pages/EventsPage";
import EventPage from "./pages/EventPage";
import AddEvent from "./components/AddEvent";

const App = () => {
  return (
    <Router>
      <div>
        <h1>Eventually Events</h1>
        <Navigation />
        <Routes>
          <Route path="/" element={<EventsPage />} />
          <Route path="/event/:eventId" element={<EventPage />} />
          <Route path="/add-event" element={<AddEvent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
