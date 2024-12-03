import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and registration
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      phone_number: "",
      password: "",
    });
    setMessage("");
    setError("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin
      ? "https://www.api.sanfelipe-hotel.com/api/users/login"
      : "https://www.api.sanfelipe-hotel.com/api/users/register";

    const requestBody = isLogin
      ? {
          email: formData.email,
          password: formData.password,
        }
      : {
          name: formData.name,
          email: formData.email,
          phone_number: formData.phone_number,
          password: formData.password,
        };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error inesperado");
      }

      if (isLogin) {
        setMessage("Inicio de sesión exitoso. Redirigiendo...");
        console.log("JWT Token:", data.access_token);
        // Save or use the token as needed
        localStorage.setItem("authToken", data.access_token);
        setTimeout(() => {
          // Redirect to the reservations page
          navigate("/reservations");
        }, 1500); // Redirect after 1.5 seconds
      } else {
        setMessage("Registro exitoso. Ahora puedes iniciar sesión.");
        setTimeout(() => {
          setIsLogin(true); // Switch to login form
        }, 1500); // Wait before switching forms
      }
    } catch (err) {
      setError(err.message || "Error al procesar la solicitud.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between mb-6">
        <button
          className={`px-4 py-2 font-bold ${
            isLogin ? "bg-green text-white" : "bg-gray-200"
          } rounded-l-lg`}
          onClick={toggleForm}
        >
          Iniciar Sesión
        </button>
        <button
          className={`px-4 py-2 font-bold ${
            !isLogin ? "bg-green text-white" : "bg-gray-200"
          } rounded-r-lg`}
          onClick={toggleForm}
        >
          Registrarse
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Teléfono</label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="block text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green text-white py-2 rounded"
        >
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </button>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default Login;
