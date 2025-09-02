import React from 'react'

type Props = {
  heading: string
  paragraph: string
}

export default function HighImpact({ heading, paragraph }: Props) {
  return (
    <div className="mt-6 gap-4 sm:grid sm:grid-cols-2 md:mt-12">
      <div className="sm:w-80">
        <h2 className="text-3xl font-bold sm:text-4xl">{heading}</h2>
      </div>
      <div className="mt-6 sm:mt-0">
        <p>{paragraph}</p>
      </div>
    </div>
  )
}
