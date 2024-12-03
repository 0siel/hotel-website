import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Reservations = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for the auth token
    const token = localStorage.getItem("authToken");
    if (!token) {
      // Redirect to login if no token is found
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold">Reservations Page</h1>
      <p>Booking functionality will go here.</p>
    </div>
  );
};

export default Reservations;
