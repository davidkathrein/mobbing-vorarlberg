import React from 'react'

type Props = {
  heading: string
}

export default function LowImpact({ heading }: Props) {
  return (
    <div className="mt-6 gap-4 sm:grid sm:grid-cols-2">
      <div className="sm:w-80">
        <h2 className="text-3xl font-bold sm:text-4xl">{heading}</h2>
      </div>
    </div>
  )
}
