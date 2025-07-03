'use client'

import { easeOut, motion } from 'framer-motion'

interface SectionScrollContainerProps {
  children: React.ReactNode[]
}

export default function SectionScrollContainer({ children }: SectionScrollContainerProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut
      }
    }
  }

  return (
    <div className="scroll-container">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {children.map((child, index) => (
          <motion.div
            key={index}
            className="scroll-section"
            variants={sectionVariants}
            viewport={{ once: true, margin: "-20%" }}
            whileInView="visible"
            initial="hidden"
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
} 