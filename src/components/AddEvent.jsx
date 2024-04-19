import React, { useState } from "react";

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    location: "",
    startTime: "",
    endTime: "",
    categoryIds: [],
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const addCategory = () => {
    let categoryId = 0;
    switch (eventData.category) {
      case "sports":
        categoryId = 1;
        break;
      case "games":
        categoryId = 2;
        break;
      case "relaxation":
        categoryId = 3;
        break;
      default:
        break;
    }

    setEventData((prevEventData) => ({
      ...prevEventData,
      categoryIds: [...prevEventData.categoryIds, categoryId],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        setSuccess(true);
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
    <div>
      <h2>Add Event</h2>
      {error && <p>{error}</p>}
      {success && <p>Event successfully added!</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={eventData.title}
            onChange={(e) =>
              setEventData({ ...eventData, title: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={eventData.description}
            onChange={(e) =>
              setEventData({ ...eventData, description: e.target.value })
            }
          ></textarea>
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={eventData.location}
            onChange={(e) =>
              setEventData({ ...eventData, location: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="datetime-local"
            id="startTime"
            value={eventData.startTime}
            onChange={(e) =>
              setEventData({ ...eventData, startTime: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="endTime">End Time:</label>
          <input
            type="datetime-local"
            id="endTime"
            value={eventData.endTime}
            onChange={(e) =>
              setEventData({ ...eventData, endTime: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={eventData.category}
            onChange={(e) =>
              setEventData({ ...eventData, category: e.target.value })
            }
          >
            <option value="sports">Sports</option>
            <option value="games">Games</option>
            <option value="relaxation">Relaxation</option>
          </select>
          <button type="button" onClick={addCategory}>
            Add Category
          </button>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddEvent;
