import { useState } from 'react';

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    'https://i.ibb.co/mt1CbJb/slider-pizza.jpg', // Add other image paths here
  ];

  const back = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : slides.length - 1));
  };

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex < slides.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="mt-20 relative w-full h-[50vh] sm:h-screen overflow-hidden bg-white">
      <div className="relative w-full h-full flex justify-center items-center">
        {slides.map((slide, index) => (
          <figure key={index} className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${currentIndex === index ? '' : 'hidden'}`}>
            <img src={slide} className="object-cover max-w-full max-h-full w-full h-full" style={{ objectFit: 'contain' }} alt={`Slide ${index + 1}`} />
          </figure>
        ))}
      </div>
      <button onClick={back} className="flex justify-center items-center absolute left-6 lg:left-14 top-1/2 -translate-y-1/2 size-11 z-10 rounded-full bg-gray-100 hover:bg-gray-200 shadow-md">
        <svg className="size-8 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <button onClick={next} className="flex justify-center items-center absolute right-6 lg:right-14 top-1/2 -translate-y-1/2 size-11 z-10 rounded-full bg-gray-100 hover:bg-gray-200 shadow-md">
        <svg className="size-8 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  );
}

export default Slider;
