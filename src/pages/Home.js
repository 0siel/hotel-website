import React from "react";
import Header from "../components/Header";
import Welcome from "../components/Welcome";
import EventsComponent from "../components/EventsComponent";
import Rooms from "./Rooms";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="w-full">
      <Header />
      <main className="w-full">
        {/* Welcome Section */}
        <Welcome />
        {/* Rooms Section */}
        <Rooms />
        {/* Events Section */}
        <EventsComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
