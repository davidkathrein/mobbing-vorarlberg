import { motion, MotionProps } from 'motion/react'
import Image, { ImageProps } from 'next/image'

type MotionImageProps = ImageProps & MotionProps

const MotionImage = motion<ImageProps>(Image)

export default function AnimatedImage(props: MotionImageProps) {
  return <MotionImage {...props} />
}
