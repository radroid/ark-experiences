"use client";

import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface Founder {
  id: number;
  name: string;
  designation: string;
  image: string;
  socialUrl?: string; // Optional social media URL (Instagram, Facebook, LinkedIn, X, etc.)
}

interface FoundersSectionProps {
  founders: Founder[];
  className?: string;
}

export default function FoundersSection({ founders, className = "" }: FoundersSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div className={cn("", className)}>
      <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-on-dark)' }}>
        Meet Our Founders
      </h4>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center w-full">
          <div className="flex items-center gap-2">
            {founders.map((founder) => {
              const content = (
                <div
                  className="-mr-4 relative group"
                  key={founder.name}
                  onMouseEnter={() => setHoveredIndex(founder.id)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <AnimatePresence mode="popLayout">
                    {hoveredIndex === founder.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.6 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: {
                            type: "spring",
                            stiffness: 260,
                            damping: 10,
                          },
                        }}
                        exit={{ opacity: 0, y: 20, scale: 0.6 }}
                        style={{
                          translateX: translateX,
                          rotate: rotate,
                          whiteSpace: "nowrap",
                        }}
                        className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md bg-foreground z-50 shadow-xl px-4 py-2"
                      >
                        <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px" />
                        <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />
                        <div className="font-bold text-background relative z-30 text-base">
                          {founder.name}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {founder.designation}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <img
                    onMouseMove={handleMouseMove}
                    height={100}
                    width={100}
                    src={founder.image}
                    alt={founder.name}
                    className="object-cover !m-0 !p-0 object-top rounded-full h-14 w-14 border-2 group-hover:scale-105 group-hover:z-30 border-background relative transition duration-500"
                    style={{
                      cursor: founder.socialUrl ? 'pointer' : 'default'
                    }}
                    onClick={(e) => {
                      if (founder.socialUrl) {
                        e.preventDefault();
                        window.open(founder.socialUrl, '_blank', 'noopener,noreferrer');
                      }
                    }}
                  />
                  {founder.socialUrl && (
                    <div className="absolute inset-0 rounded-full border-2 border-transparent hover:border-white/30 transition-all duration-200 pointer-events-none" />
                  )}
                </div>
              );

              return content;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
