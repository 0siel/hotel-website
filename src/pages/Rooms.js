import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import RoomsComponent from "../components/RoomsComponent";

const Rooms = () => {
  return (
    <div>
      <Header />
      <RoomsComponent />
    </div>
  );
};

export default Rooms;
