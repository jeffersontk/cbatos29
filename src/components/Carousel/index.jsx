// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react"

export const Carousel = ({ children, items, circuleButton = false, arrowButton = false, hasPedding = false }) => {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev === items.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage()
    }, 3000)

    return () => clearInterval(interval)
  }, [currentImage])

  return (
    <div className="relative">
      <div className="overflow-hidden w-full max-h-[488px]">
        <div
          className="flex max-h-[488px]"
          style={{
            transform: `translateX(-${currentImage * 100}%)`,
            transition: "transform 0.5s ease",
          }}
        >
          {children && children}
        </div>
      </div>
      {
        circuleButton &&
         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
        {items.map((_, index) => (
          <button
            key={_._key}
            onClick={() => setCurrentImage(index)}
            className={`w-4 h-4 rounded-full ${
              index === currentImage
                ? "bg-gray-500 w-8 transform transition-all duration-500"
                : "bg-gray-700 opacity-50"
            } focus:outline-none`}
          ></button>
        ))}
        </div>
      }
      {
        arrowButton && 
 <>
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 h-full px-3 py-1 rounded-md text-white text-sm focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10 opacity-75 "
          >
            <path
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 h-full px-3 py-1 rounded-md text-white text-sm focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10 opacity-75 "
          >
            <path
              fillRule="evenodd"
              d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
 </>
      }
    </div>
  )
}
