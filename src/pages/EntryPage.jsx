import React from "react";
import { Link } from "react-router-dom";

const EntryPage = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333" }}>
        Eventually Events
      </h1>
      <p style={{ textAlign: "center" }}>
        Welcome to the place to be when it comes to events and everything hot on
        the block! Here, you can find any of your favorite events to come, and
        when youve had enough of others, eventually, your very own event!
      </p>
      <Link to="/events" style={{ color: "#ba7718" }}>
        Explore Events
      </Link>
    </div>
  );
};

export default EntryPage;
