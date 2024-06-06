import React from 'react'
import parse from 'html-react-parser';

interface props {
  iframe: string;
}

export const Iframe: React.FC<props> = ({iframe}: props) => {
  return (
    <div className="w-full flex justify-center">
      {parse(iframe)}
    </div>
  )
}
