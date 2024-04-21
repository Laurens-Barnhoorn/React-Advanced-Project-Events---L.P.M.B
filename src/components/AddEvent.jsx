import React, { useState, useEffect } from "react";
import eventsData from "../../events.json";

const AddEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [creatorId, setCreatorId] = useState("");
  const [image, setImage] = useState("");
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const usersFromEvents = eventsData.users;
    const categoriesFromEvents = eventsData.categories;
    setUsers(usersFromEvents);
    setCategories(categoriesFromEvents);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const categoryIdInt = parseInt(selectedCategory);
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          location,
          startTime,
          endTime,
          createdBy: parseInt(creatorId),
          image,
          categoryIds: [categoryIdInt],
        }),
      });

      if (response.ok) {
        window.location.href = "/events";
      } else {
        throw new Error("Failed to add event");
      }
    } catch (error) {
      setError(
        "An error occurred while adding the event. Please try again later."
      );
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333" }}>
        Add Event
      </h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ display: "inline-block", textAlign: "left" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "0.5rem",
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "0.5rem",
              }}
            ></textarea>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "0.5rem",
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="startTime">Start Time:</label>
            <input
              type="datetime-local"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "0.5rem",
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="endTime">End Time:</label>
            <input
              type="datetime-local"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "0.5rem",
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="image">Image URL:</label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "0.5rem",
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="creator">Creator:</label>
            <select
              id="creator"
              value={creatorId}
              onChange={(e) => setCreatorId(e.target.value)}
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "0.5rem",
              }}
            >
              <option value="">Select a creator</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "0.5rem",
              }}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "0.5rem",
              backgroundColor: "#f5b042",
              color: "#fff",
              cursor: "pointer",
              display: "block",
              margin: "0 auto",
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
