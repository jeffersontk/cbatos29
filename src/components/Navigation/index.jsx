import { useState } from "react"

export const Navigation = ({ pathname }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative w-full">
      <div className="w-full flex justify-end pr-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="-mr-2 -my-2 lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <nav className="hidden lg:flex space-x-10">
            <a
              href="/"
              className="text-lg font-medium text-white hover:text-gray-300"
            >
              Início
            </a>
            <a
              href="/ebd"
              className="text-lg font-medium text-white hover:text-gray-300"
            >
              EBD
            </a>
            <a
              href="/cells"
              className="text-lg font-medium text-white hover:text-gray-300"
            >
              Células
            </a>
            <a
              href="/event"
              className="text-lg font-medium text-white hover:text-gray-300"
            >
              Eventos
            </a>
            <a
              href="/pastoral-team"
              className="text-lg font-medium text-white hover:text-gray-300"
            >
              Equipe Pastoral
            </a>
            <a
              href="/ministry"
              className="text-lg font-medium text-white hover:text-gray-300"
            >
              Ministerios
            </a>
            <a
              href="/history"
              className="text-lg font-medium text-white hover:text-gray-300"
            >
              Nossa História
            </a>
          </nav>
        </div>
      </div>
      <div className="absolute right-0 top-0 w-full max-w-64">
        <div
          className={`${
            isOpen
              ? "bg-primary-dark h-screen w-full px-4 py-2 transform translate-all duration-500"
              : "hidden"
          }`}
        >
          <header className="flex justify-end">
            <button onClick={toggleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 text-gray-50"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </header>
          <div className="flex flex-col gap-4 mt-4">
            <a
              href="/"
              className={`block text-lg font-medium text-white hover:text-gray-300 ${
                pathname === "/" ? "border-b-2 border-white" : ""
              }`}
            >
              Início
            </a>
            <a
              href="/ebd"
              className={`block text-lg font-medium text-white hover:text-gray-300 ${
                String(pathname).includes("/ebd")
                  ? "border-b-2 border-white"
                  : ""
              }`}
            >
              EBD
            </a>
            <a
              href="/cells"
              className={`block text-lg font-medium text-white hover:text-gray-300 ${
                pathname === "/cells" ? "border-b-2 border-white" : ""
              }`}
            >
              Células
            </a>
            <a
              href="/event"
              className={`block text-lg font-medium text-white hover:text-gray-300 ${
                pathname === "/event" ? "border-b-2 border-white" : ""
              }`}
            >
              Eventos
            </a>
            <a
              href="/pastoral-team"
              className={`block text-lg font-medium text-white hover:text-gray-300 ${
                pathname === "/pastoral-team" ? "border-b-2 border-white" : ""
              }`}
            >
              Equipe Pastoral
            </a>
            <a
              href="/ministry"
              className={`block text-lg font-medium text-white hover:text-gray-300 ${
                pathname === "/ministry" ? "border-b-2 border-white" : ""
              }`}
            >
              Ministerios
            </a>
            <a
              href="/history"
              className={`block text-lg font-medium text-white hover:text-gray-300 ${
                pathname === "/history" ? "border-b-2 border-white" : ""
              }`}
            >
              Nossa História
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
