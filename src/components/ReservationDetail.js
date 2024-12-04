import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import { jsPDF } from "jspdf";

const ReservationDetail = () => {
  const { state } = useLocation(); // Reservation details passed via navigate
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    // Redirect to home if no reservation data is passed
    if (!state?.reservation) {
      navigate("/reservations");
    } else {
      setReservation(state.reservation);
    }
  }, [state, navigate]);

  const printPDF = async () => {
    if (!reservation) return;

    // Create a new PDF document
    const doc = new jsPDF();

    // Generate QR Code with reservation details
    const qrCodeData = `
    ID de Reserva: ${reservation.id}
    Habitación: ${reservation.room_name}
    Cliente: ${reservation.user_name}
    Check-in: ${reservation.check_in}
    Check-out: ${reservation.check_out}
    Precio Total: $${reservation.price.toFixed(2)}
  `;
    const qrCode = await QRCode.toDataURL(qrCodeData); // Generate the QR code as a Data URL

    // PDF Header
    doc.setFillColor("#43523a");
    doc.rect(0, 0, 210, 30, "F");
    doc.setTextColor("#ffffff");
    doc.setFontSize(20);
    doc.text("Detalles de la Reserva", 105, 20, { align: "center" });

    // Reservation Details
    doc.setTextColor("#000000");
    doc.setFontSize(12);
    const details = [
      { label: "ID de Reserva", value: reservation.id },
      { label: "Habitación", value: reservation.room_name },
      { label: "ID de Habitación", value: reservation.room_id },
      { label: "Cliente", value: reservation.user_name },
      { label: "Correo Electrónico", value: reservation.user_email },
      { label: "Teléfono", value: reservation.user_phone },
      { label: "Check-in", value: reservation.check_in },
      { label: "Check-out", value: reservation.check_out },
      { label: "Precio Total", value: `$${reservation.price.toFixed(2)}` },
    ];
    let yPosition = 50;
    details.forEach((item) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${item.label}:`, 10, yPosition);
      doc.setFont("helvetica", "normal");
      doc.text(`${item.value}`, 60, yPosition);
      yPosition += 10;
    });

    // Add QR Code
    doc.addImage(qrCode, "PNG", 150, 50, 40, 40); // Position and size of the QR code

    // Footer
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text(
      "Gracias por elegir nuestro hotel. Esperamos su visita.",
      105,
      290,
      { align: "center" }
    );

    // Save PDF
    doc.save(`Reserva_${reservation.id}.pdf`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">
        Detalles de la Reserva
      </h1>
      {reservation ? (
        <div className="p-4 border rounded-lg bg-gray-100">
          <h2 className="text-2xl font-bold mb-4">Reserva #{reservation.id}</h2>
          <p className="text-gray-700 mb-2">
            <strong>Habitación:</strong> {reservation.room_name}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>ID de Habitación:</strong> {reservation.room_id}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Cliente:</strong> {reservation.user_name}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Correo Electrónico:</strong> {reservation.user_email}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Teléfono:</strong> {reservation.user_phone}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Check-in:</strong> {reservation.check_in}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Check-out:</strong> {reservation.check_out}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Precio Total:</strong> ${reservation.price.toFixed(2)}
          </p>
          <button
            onClick={printPDF}
            className="bg-green text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Descargar PDF
          </button>
          <button
            onClick={() => navigate("/")}
            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Volver a Inicio
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Cargando detalles de la reserva...
        </p>
      )}
    </div>
  );
};

export default ReservationDetail;
