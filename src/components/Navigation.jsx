import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">List of Events</Link>
        </li>
        <li>
          <Link to="/event/1">Event</Link>
        </li>
        <li>
          <Link to="/add-event">Add event</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
