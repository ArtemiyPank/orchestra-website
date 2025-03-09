"use client"

import type { Alumni } from "@/types/Alumni"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const CardAlumni = ({ name, description, image, story }: Alumni) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => setExpanded(!expanded)

  // Get initials for avatar fallback
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-white">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold text-white">{name}</h2>
          </div>
        </div>

        <CardContent className="flex-grow pt-4">
          <p className="text-foreground/80">{description}</p>

          {story && (
            <div className="mt-4">
              <div
                className={cn(
                  "text-foreground/70 overflow-hidden transition-all duration-300",
                  expanded ? "max-h-[500px]" : "max-h-[80px]",
                )}
              >
                <p>{story}</p>
              </div>
            </div>
          )}
        </CardContent>

        {story && (
          <CardFooter className="pt-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpanded}
              className="w-full flex items-center gap-2 text-primary"
            >
              <span>{expanded ? "Show less" : "Read more"}</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", expanded ? "rotate-180" : "")} />
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  )
}

export default CardAlumni

