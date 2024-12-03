import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch rooms from the API
    const fetchRooms = async () => {
      try {
        const response = await fetch(
          "https://www.api.sanfelipe-hotel.com/api/rooms/"
        );
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return <p className="text-center text-green">Loading rooms...</p>;
  }

  return (
    <div>
      <Header />
      <section className="bg-white py-8">
        <h2 className="text-3xl text-green font-bold text-center mb-6">
          Available Rooms
        </h2>
        <div className="overflow-x-auto whitespace-nowrap">
          <div className="flex gap-6 px-4">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="min-w-[300px] bg-green text-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Room Image */}
                <img
                  src={room.images_list[0]}
                  alt={room.name}
                  className="w-full h-48 object-cover"
                />
                {/* Room Details */}
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2 truncate">
                    {room.name}
                  </h3>
                  <p className="text-sm mb-2 line-clamp-3">
                    {room.description}
                  </p>
                  <p className="text-sm">
                    <span className="font-bold">$/noche:</span> $
                    {room.price_per_night.toFixed(2)}
                  </p>
                  <p className="text-sm">
                    <span className="font-bold"></span> {room.square_meters} m²
                  </p>
                  <button
                    onClick={() =>
                      navigate("/reservations", {
                        state: {
                          roomId: room.id,
                          roomName: room.name,
                          pricePerNight: room.price_per_night,
                        },
                      })
                    }
                    className="mt-4 bg-gold text-white px-4 py-2 rounded-md hover:bg-white hover:text-gold transition"
                  >
                    Reservar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rooms;
