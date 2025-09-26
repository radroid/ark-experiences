"use client";
import React from "react";
import { motion } from "motion/react";

type ColumnTestimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: ColumnTestimonial[];
  duration?: number;
}) => {
  return (
    <div
      className={
        `${props.className ?? ""} relative h-[520px] sm:h-[560px] md:h-[600px] lg:h-[640px] overflow-hidden`
      }
      style={{
        // Soft fade at top/bottom so the scroll loops seamlessly
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        maskImage:
          "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 18,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="p-6 md:p-8 rounded-3xl border max-w-xs w-full shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderColor: "rgba(255,255,255,0.08)",
                    color: "var(--pure-white)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <div className="leading-relaxed" style={{ opacity: 0.95 }}>
                    {text}
                  </div>
                  <div className="flex items-center gap-3 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5">
                        {name}
                      </div>
                      <div
                        className="leading-5 tracking-tight"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
