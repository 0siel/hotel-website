import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green text-white py-8">
      <div className="container mx-auto px-4">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Google Maps */}
          <div className="flex justify-center">
            <iframe
              title="Hotel Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59587.0434894969!2d-101.29910152939611!3d21.02507358933483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842b73f58b0cf1eb%3A0x25f4b0d165571e74!2sGuanajuato%2C%20Gto.!5e0!3m2!1ses-419!2smx!4v1733202054196!5m2!1ses-419!2smx"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces:</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-gold transition duration-200">
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="/rooms"
                  className="hover:text-gold transition duration-200"
                >
                  Habitaciones
                </a>
              </li>
              <li>
                <a
                  href="/events"
                  className="hover:text-gold transition duration-200"
                >
                  Eventos
                </a>
              </li>
              <li>
                <a
                  href="/reservations"
                  className="hover:text-gold transition duration-200"
                >
                  Reservar
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-gold transition duration-200"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Síguenos:</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition duration-200"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition duration-200"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition duration-200"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition duration-200"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center text-sm">
          <p>© 2024 San Felipe Hotel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
