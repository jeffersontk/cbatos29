import React from 'react'
import parse from 'html-react-parser';

export function GoogleMapsIframe({iframe}) {
  return (
    <div className="w-full flex justify-center">
      {parse(iframe)}
    </div>
  )
}
