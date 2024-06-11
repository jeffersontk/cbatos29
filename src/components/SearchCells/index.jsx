import { useState, useEffect } from "react"

export const SearchCell = ({ searchParams }) => {
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    const handleInput = (event) => {
      setSearchText(event.target.value.trim())
    }

    const inputElement = document.getElementById("searchInput")
    if (inputElement) {
      inputElement.addEventListener("input", handleInput)
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("input", handleInput)
      }
    }
  }, [])

  const handleSearch = () => {
    const url = new URL(window.location.href)
    url.searchParams.set("search", searchText)
    window.location.href = url.toString()
  }

  const handleClear = () => {
    setSearchText("")
    const url = new URL(window.location.href)
    url.searchParams.delete("search")
    window.location.href = url.toString()
  }

  return (
    <div className="bg-secondary-blue w-full p-8 pb-20 flex flex-col gap-2">
      <div className="pl-4 w-full flex items-center justify-between bg-white rounded-md">
        <input
          type="text"
          placeholder="Buscar célula"
          className="py-2 w-full outline-none"
          id="searchInput"
          value={searchText}
        />
        {!searchText ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mr-4 text-secondary-blue"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        ) : (
          <button onClick={handleClear} name="close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-2 text-secondary-blue"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {searchText && (
          <button
            className="bg-primary-light text-white py-2 px-2 flex gap-2 rounded-tr-md rounded-br-md"
            onClick={handleSearch}
          >
            Buscar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        )}
      </div>
      {searchParams && (
        <div className="flex">
          <div className="text-white bg-primary-light rounded-full  px-2 flex items-center justify-center gap-1">
            <span className="text-sm">{searchParams}</span>
            <button onClick={handleClear} name="close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6  text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
