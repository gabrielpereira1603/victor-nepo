import * as React from "react"

function MaxValueComponent(props: any) {
  return (
    <svg
      height={props.height || 512}
      width={props.width || 512}
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      className={`${props.className || ''}`}
      {...props}
    >
      <path d="M24 1.5V7h-1V1.707l-5.646 5.646-.707-.707L22.293 1H17V0h5.5c.827 0 1.5.673 1.5 1.5zM12 23C5.935 23 1 18.065 1 12S5.935 1 12 1V0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12h-1c0 6.065-4.935 11-11 11zm-.5-18v2h-1.005A2.498 2.498 0 008 9.495c0 1.108.744 2.095 1.81 2.398l4.106 1.174A1.502 1.502 0 0115 14.505c0 .824-.671 1.495-1.495 1.495h-3.01A1.497 1.497 0 019 14.505V14H8v.505A2.498 2.498 0 0010.495 17H11.5v2h1v-2h1.005A2.498 2.498 0 0016 14.505a2.503 2.503 0 00-1.81-2.398l-4.106-1.174A1.502 1.502 0 019 9.495C9 8.671 9.671 8 10.495 8h3.01C14.329 8 15 8.671 15 9.495V10h1v-.505A2.498 2.498 0 0013.505 7H12.5V5h-1z" />
    </svg>
  )
}

export default MaxValueComponent
