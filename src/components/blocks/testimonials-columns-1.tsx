"use client";
import React from "react";
import { motion } from "motion/react";

export interface TestimonialItem {
  text: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, name, role }, i) => (
                <div className="p-6 rounded-3xl shadow-lg max-w-xs w-full" style={{backgroundColor: 'var(--eerie-black-200)', color: 'var(--pure-white)'}} key={i}>
                  <div className="text-sm leading-relaxed mb-4" style={{color: 'var(--pure-white)', opacity: 0.9}}>{text}</div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center font-semibold text-sm" style={{backgroundColor: 'var(--primary-blue)', color: 'var(--pure-white)'}}>
                      {name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5" style={{color: 'var(--pure-white)'}}>{name}</div>
                      <div className="leading-5 tracking-tight" style={{color: 'var(--pure-white)', opacity: 0.7}}>{role}</div>
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

;