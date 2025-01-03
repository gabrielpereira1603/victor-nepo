import * as React from "react"

function ShareComponent(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      height={props.height || 24}
      width={props.width || 24}
      fill="currentColor" 
      {...props}
    >
      <path d="M16 10c1.654 0 3-1.346 3-3s-1.346-3-3-3a3.004 3.004 0 00-2.828 3.999l-3.831 2.128A2.996 2.996 0 007 9c-1.654 0-3 1.346-3 3s1.346 3 3 3c.946 0 1.791-.441 2.341-1.127l3.83 2.128A3.004 3.004 0 0015.999 20c1.654 0 3-1.346 3-3s-1.346-3-3-3c-.946 0-1.791.441-2.341 1.127l-3.83-2.128a2.982 2.982 0 000-1.998l3.831-2.128A2.996 2.996 0 0016 10zm0 5c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2c0-1.359 1.259-2 2-2zm-9-1c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm9-9c1.103 0 2 .897 2 2s-.897 2-2 2c-1.128 0-2-1-2-2 0-1.103.897-2 2-2zm3.5-5h-15A4.505 4.505 0 000 4.5v15C0 21.981 2.019 24 4.5 24h15c2.481 0 4.5-2.019 4.5-4.5v-15C24 2.019 21.981 0 19.5 0zM23 19.5c0 1.93-1.57 3.5-3.5 3.5h-15C2.57 23 1 21.43 1 19.5v-15C1 2.57 2.57 1 4.5 1h15C21.43 1 23 2.57 23 4.5v15z" />
    </svg>
  )
}

export default ShareComponent