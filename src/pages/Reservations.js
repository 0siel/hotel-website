import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Reservations = () => {
  const { state } = useLocation(); // Access room data passed via navigate
  const navigate = useNavigate();
  const [roomDetails, setRoomDetails] = useState(null);
  const [formData, setFormData] = useState({
    check_in: "",
    check_out: "",
  });
  const [reservations, setReservations] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const user_data = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }

    // Redirect to Rooms page if no room data is passed
    if (!state?.roomId) {
      navigate("/rooms");
    } else {
      // Fetch detailed room data and reservations
      const fetchRoomData = async () => {
        try {
          const [roomResponse, reservationsResponse] = await Promise.all([
            fetch(
              `https://www.api.sanfelipe-hotel.com/api/rooms/${state.roomId}`
            ),
            fetch("https://www.api.sanfelipe-hotel.com/api/reservations/"),
          ]);

          const roomData = await roomResponse.json();
          const reservationsData = await reservationsResponse.json();

          setRoomDetails(roomData);
          setReservations(
            reservationsData.filter(
              (res) => res.room_id === state.roomId // Only reservations for this room
            )
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchRoomData();
    }
  }, [state, navigate]);

  useEffect(() => {
    if (formData.check_in && formData.check_out && roomDetails) {
      const currentDate = new Date(); // Today's date
      const checkInDate = new Date(formData.check_in);
      const checkOutDate = new Date(formData.check_out);
      const diffTime = checkOutDate - checkInDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Validate check-in date is not in the past
      if (checkInDate < currentDate.setHours(0, 0, 0, 0)) {
        setErrorMessage("La fecha de check-in no puede estar en el pasado.");
        setTotalPrice(0); // Reset total price
        return;
      }

      // Validate reservation duration (max 3 days)
      if (diffDays > 3) {
        setErrorMessage(
          "Ponganse en contacto con el hotel para reservar más de 3 días: 552 564 4492"
        );
        setTotalPrice(0); // Reset total price
        return;
      } else if (diffDays < 1) {
        setErrorMessage(
          "La fecha de check-out debe ser posterior al check-in."
        );
        setTotalPrice(0); // Reset total price
        return;
      }

      // Check for overlapping reservations
      const hasOverlap = reservations.some((res) => {
        const existingCheckIn = new Date(res.check_in);
        const existingCheckOut = new Date(res.check_out);
        return (
          (checkInDate >= existingCheckIn && checkInDate < existingCheckOut) ||
          (checkOutDate > existingCheckIn &&
            checkOutDate <= existingCheckOut) ||
          (checkInDate <= existingCheckIn && checkOutDate >= existingCheckOut)
        );
      });

      if (hasOverlap) {
        setErrorMessage(
          "Las fechas seleccionadas no están disponibles para esta habitación."
        );
        setTotalPrice(0); // Reset total price
        return;
      }

      setErrorMessage(""); // Clear error message
      const calculatedPrice = diffDays * roomDetails.price_per_night;
      setTotalPrice(calculatedPrice > 0 ? calculatedPrice : 0);
    }
  }, [formData, roomDetails, reservations]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReserve = (e) => {
    e.preventDefault();
    if (errorMessage) {
      alert("Corrija los errores antes de continuar.");
      return;
    }
    setShowConfirmation(true); // Show confirmation modal
  };

  const confirmReservation = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login"); // Ensure token is still present
      return;
    }

    // Prepare reservation details to send
    const reservationDetails = {
      room_id: roomDetails.id,
      customer_id: user_data.id,
      check_in: formData.check_in,
      check_out: formData.check_out,
      nights: Math.ceil(
        (new Date(formData.check_out) - new Date(formData.check_in)) /
          (1000 * 60 * 60 * 24)
      ),
      price: totalPrice,
    };

    try {
      // Send reservation to the API
      const response = await fetch(
        "https://www.api.sanfelipe-hotel.com/api/reservations/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reservationDetails),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const createdReservation = {
          ...reservationDetails,
          id: data.reservation.id, // Set the reservation ID from the response
          room_name: roomDetails.name,
          user_name: user_data.name,
          user_email: user_data.email,
          user_phone: user_data.phone_number,
        };

        // Navigate to ReservationDetail component with reservation details
        navigate("/reservation-detail", {
          state: { reservation: createdReservation },
        });
      } else {
        console.error("Error creating reservation:", data.message);
        alert("Error al realizar la reservación. Inténtelo nuevamente.");
      }
    } catch (error) {
      console.error("Error connecting to API:", error);
      alert("Error de conexión. Verifique su red e inténtelo nuevamente.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Reservación</h1>
      {roomDetails ? (
        <>
          {/* Room Card */}
          <div className="p-4 border rounded-lg bg-gray-100 mb-6">
            <h2 className="text-2xl font-bold mb-4">{roomDetails.name}</h2>
            <p className="text-gray-700 mb-2">
              <strong>Descripción:</strong> {roomDetails.description}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Precio por noche:</strong> $
              {roomDetails.price_per_night.toFixed(2)}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Metros cuadrados:</strong> {roomDetails.square_meters} m²
            </p>
            <p className="text-gray-700 mb-4">
              <strong>ID de Habitación:</strong> {roomDetails.id}
            </p>
            <div className="flex gap-4 overflow-x-auto mb-4">
              {roomDetails.images_list.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Imagen ${index + 1} de ${roomDetails.name}`}
                  className="w-48 h-32 object-cover rounded-lg shadow-md flex-shrink-0"
                />
              ))}
            </div>
            <button
              onClick={() => navigate("/rooms")}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Cambiar Habitación
            </button>
          </div>

          {/* Reservation Form */}
          <form
            onSubmit={handleReserve}
            className="p-4 border rounded-lg bg-white"
          >
            <h2 className="text-2xl font-bold mb-4">Detalles de la Reserva</h2>
            <div className="mb-4">
              <label className="block font-bold">Check-in</label>
              <input
                type="date"
                name="check_in"
                value={formData.check_in}
                onChange={handleFormChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold">Check-out</label>
              <input
                type="date"
                name="check_out"
                value={formData.check_out}
                onChange={handleFormChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            {errorMessage && (
              <p className="text-red-600 mb-4 font-semibold">{errorMessage}</p>
            )}
            <p className="text-gray-700 mb-4">
              <strong>Precio total:</strong> ${totalPrice.toFixed(2)}
            </p>
            <button
              type="submit"
              className="bg-green text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Reservar
            </button>
          </form>
        </>
      ) : (
        <p className="text-center text-gray-500">
          Cargando detalles de la habitación...
        </p>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Confirmación de Reservación
            </h2>
            <p className="mb-4">
              ¿Está seguro de que desea reservar la habitación{" "}
              <strong>{roomDetails.name}</strong> del{" "}
              <strong>{formData.check_in}</strong> al{" "}
              <strong>{formData.check_out}</strong> por un total de{" "}
              <strong>${totalPrice.toFixed(2)}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
              <button
                onClick={confirmReservation}
                className="bg-green text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservations;
