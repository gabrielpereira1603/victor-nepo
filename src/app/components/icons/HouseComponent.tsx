import * as React from "react"

function HouseComponent(props:any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      height={props.height || 512}
      width={props.width || 512}
      className={`${props.className || ''}`}

      {...props}
    >
      <path d="M14.041 13.641L8.592 9.377a1.768 1.768 0 00-2.185 0L.96 13.641A2.483 2.483 0 000 15.61v8.391h15v-8.392c0-.774-.35-1.492-.959-1.969zM14 23H1v-7.391c0-.465.21-.896.576-1.182l5.447-4.264a.772.772 0 01.952 0l5.449 4.264c.365.286.575.717.575 1.182V23zm-9-3h5v-5H5v5zm1-4h3v3H6v-3zm12-3h2v1h-2v-1zm0 4h2v1h-2v-1zM14 5h2v1h-2V5zm6 1h-2V5h2v1zm-6 3h2v1h-2V9zm4 0h2v1h-2V9zm6-6.5V24h-7v-1h6V2.5c0-.827-.673-1.5-1.5-1.5h-9c-.827 0-1.5.673-1.5 1.5V9l-1-.783V2.5C10 1.121 11.121 0 12.5 0h9C22.879 0 24 1.121 24 2.5z" />
    </svg>
  )
}

export default HouseComponent
