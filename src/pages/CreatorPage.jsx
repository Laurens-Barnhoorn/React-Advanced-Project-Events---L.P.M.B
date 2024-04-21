import React, { useState, useEffect } from "react";
import AddCreator from "../components/AddCreator";

const EventCreatorsPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const userData = await response.json();
        setUsers(userData);
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setUsers(users.filter((user) => user.id !== userId));
          alert("User deleted successfully");
        } else {
          throw new Error("Failed to delete user");
        }
      } catch (error) {
        alert("Failed to delete user");
      }
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: "1rem", fontWeight: "bold", color: "#333" }}>
        Event creators
      </h1>
      <AddCreator />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333" }}>
            All Creators
          </h1>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {users.map((user) => (
              <li key={user.id} style={{ margin: "1rem", textAlign: "center" }}>
                <img
                  src={user.image}
                  alt={user.name}
                  style={{
                    width: "200px",
                    height: "auto",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
                <p
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    margin: "0.5rem 0",
                  }}
                >
                  {user.name}
                </p>
                <button
                  onClick={() => handleDelete(user.id)}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "0.5rem",
                    backgroundColor: "#f5b042",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EventCreatorsPage;
