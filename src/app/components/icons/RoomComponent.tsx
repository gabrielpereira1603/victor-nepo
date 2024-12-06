import * as React from "react"

function RoomComponent(props:any) {
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
      <path d="M21.5 2h-19A2.503 2.503 0 000 4.5V22h1v-3h22v3h1V4.5C24 3.122 22.879 2 21.5 2zm-19 1h19c.827 0 1.5.673 1.5 1.5V13h-2v-1.5c0-1.378-1.121-2.5-2.5-2.5H14c-.817 0-1.544.394-2 1.002A2.497 2.497 0 0010 9H5.5A2.503 2.503 0 003 11.5V13H1V4.5C1 3.673 1.673 3 2.5 3zm9 10H4v-1.5c0-.827.673-1.5 1.5-1.5H10c.827 0 1.5.673 1.5 1.5V13zm8.5 0h-7.5v-1.5c0-.827.673-1.5 1.5-1.5h4.5c.827 0 1.5.673 1.5 1.5V13zM1 18v-4h22v4H1z" />
    </svg>
  )
}

export default RoomComponent
