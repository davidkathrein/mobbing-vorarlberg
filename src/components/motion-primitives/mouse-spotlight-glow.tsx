import React from 'react'
import { Spotlight } from './spotlight'

export default function MouseSpotlightGlow() {
  return (
    <>
      <Spotlight
        className="motion-reduce:hidden from-accent via-accent/90 to-accent/80 blur-xl"
        size={96}
        springOptions={{
          duration: 0.1,
        }}
      />
      <div className="motion-reduce:hidden absolute inset-0">
        <svg className="h-full w-full">
          <defs>
            <pattern id="grid-pattern" width="8" height="8" patternUnits="userSpaceOnUse">
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M0 4H4M4 4V0M4 4H8M4 4V8"
                stroke="currentColor"
                strokeOpacity="0.3"
                className="stroke-primary-foreground"
              />
              <rect
                x="3"
                y="3"
                width="2"
                height="2"
                fill="currentColor"
                fillOpacity="0.25"
                className="fill-primary-foreground"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
    </>
  )
}
