import * as React from "react"

function ClearComponent(props:any) {
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
      <path d="M18 0a6 6 0 100 12 6 6 0 000-12zm2.707 7.293a.999.999 0 11-1.414 1.414L18 7.414l-1.293 1.293a.997.997 0 01-1.414 0 .999.999 0 010-1.414L16.586 6l-1.293-1.293a.999.999 0 111.414-1.414L18 4.586l1.293-1.293a.999.999 0 111.414 1.414L19.414 6l1.293 1.293zM15 14.5v8a1.5 1.5 0 01-2.272 1.286l-5-3A1.499 1.499 0 017 19.5v-5.166L1.034 7.032C.382 6.3 0 5.296 0 4.254A4.258 4.258 0 014.253 0H9.5a1.5 1.5 0 110 3H4.253a1.254 1.254 0 00-.937 2.086l6.345 7.765a1.5 1.5 0 01.338.949v4.851l2 1.2V14.5a1.5 1.5 0 113 0z" />
    </svg>
  )
}

export default ClearComponent
