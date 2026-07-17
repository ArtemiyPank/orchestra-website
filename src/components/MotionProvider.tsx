"use client"

import type { ReactNode } from "react"
import { LazyMotion, domAnimation } from "framer-motion"

// LazyMotion + m.* вместо motion.*: в бандл попадает только dom-animation
// подмножество framer-motion (~-25KB). strict запрещает случайный motion.*.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
