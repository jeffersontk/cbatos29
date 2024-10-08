import { useState } from "react"

export function Offer({ offer }) {
  const { title, description, verse, bankInfo, pix } = offer
  const [isCopyBanco, setIsCopyBanco] = useState(false)
  const [isCopyPix, setIsCopyPix] = useState(false)

  const handleCopy = (text, setIsCopy) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopy(true)
        setTimeout(() => {
          setIsCopy(false)
        }, 1000)
      })
      .catch((error) => {
        console.error("Erro ao copiar o texto:", error)
      })
  }

  return (
    <div className="bg-secondary-blue p-4 lg:p-8 rounded-md flex flex-col gap-4 w-full items-center justify-center">
      <h1 className="font-bold text-xl text-bage">{title}</h1>
      <div>
        <p className="font-light text-sm lg:text-lg text-white">
          {description}
        </p>
        <p className="font-thin text-xs lg:text-base text-white">{verse}</p>
      </div>
      <div className="flex flex-col gap-4 lg:gap-8 lg:flex-row">
        <div
          className="flex lg:flex-col gap-2 items-center cursor-pointer"
          onClick={() => handleCopy(bankInfo, setIsCopyBanco)}
        >
          <img
            src="/banco.png"
            alt="banco bradesco"
            className="h-5"
            width="103"
            height="23"
          />
          <div className="flex gap-4 items-end">
            <span className="font-medium text-xs lg:text-base text-white">
              {bankInfo}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`w-6 h-6 text-white ${
                isCopyBanco
                  ? "animate-bounce transform translate-all duration-500"
                  : ""
              }`}
            >
              <path d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z" />
              <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z" />
              <path d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z" />
            </svg>
          </div>
        </div>
        <div
          className="flex lg:flex-col gap-2 items-center cursor-pointer"
          onClick={() => handleCopy(pix, setIsCopyPix)}
        >
          <img
            src="/pix.png"
            alt="pix"
            className="h-5"
            width="63"
            height="28"
          />
          <div className="flex gap-4 items-end">
            <span className="font-medium text-sm lg:text-base text-white">
              {pix}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`w-6 h-6 text-white ${
                isCopyPix
                  ? "animate-bounce transform translate-all duration-500 ease-in-out"
                  : ""
              }`}
            >
              <path d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z" />
              <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z" />
              <path d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
