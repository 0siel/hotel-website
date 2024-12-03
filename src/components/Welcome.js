import React, { useState, useEffect } from "react";

const Welcome = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://guanajuato.mx/wp-content/uploads/2022/05/San-Felipe-Guanajuato.jpg",
    "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcTTvfQwhrHjXMVABx_f0bgvGn0WZotJe37hUsQOFz9NS3g3pZgiaXP_d78SxbUrAsJ_JSFK7h5ta9RAgXpeXM59E-NdTA2ZvL2CREkFlA",
    "https://guanajuato.mx/wp-content/uploads/2022/05/San-Felipe-Guanajuato.jpg",
    "https://antiguatrece.com/wp-content/uploads/2022/10/centro-guanajuato-1000x675.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/f8/a0/ea/plaza-de-la-paz.jpg?w=1400&h=1400&s=1",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000); // Change image every 7 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="text-center bg-green">
      {/* Hotel Name and Slogan */}
      <div className="py-6 sm:py-12 text-white">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4">San Felipe</h1>
        {/* Slogan in italic */}
        <p className="text-base sm:text-lg mb-8">
          "Tenemos una habitación para ti"
        </p>
      </div>

      {/* Full-Width Carousel */}
      <div className="relative w-full h-[50vh] sm:h-[70vh] lg:h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Carousel Controls */}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-green text-white p-3 rounded-full hover:bg-gold transition"
          onClick={prevSlide}
        >
          &#8249;
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-green text-white p-3 rounded-full hover:bg-gold transition"
          onClick={nextSlide}
        >
          &#8250;
        </button>
      </div>

      {/* Dots for Navigation */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-gold" : "bg-brown"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Welcome;
