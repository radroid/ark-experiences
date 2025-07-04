'use client'

import { motion, easeOut } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  MapPin, 
  Search, 
  Puzzle, 
  Trophy, 
  Timer,
  CheckCircle,
  Target
} from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: Users,
      title: 'Form Your Team',
      description: 'Split into 3 teams of 3-17 players each. Every team gets a unique starting location.',
      details: ['3 teams compete', 'Equal team sizes', 'Unique starting points'],
      color: 'bg-blue-100 text-blue-800',
      bgColor: 'bg-blue-50'
    },
    {
      icon: MapPin,
      title: 'Navigate Toronto',
      description: 'Visit 9 iconic Toronto locations, each holding clues to the next destination.',
      details: ['9 unique locations', 'Toronto landmarks', 'GPS coordinates provided'],
      color: 'bg-purple-100 text-purple-800',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Search,
      title: 'Solve Clues',
      description: 'Find hidden clues at each location. Some lead to the next spot, others reveal murder details.',
      details: ['Location clues', 'Murder mystery clues', 'Photo evidence required'],
      color: 'bg-orange-100 text-orange-800',
      bgColor: 'bg-orange-50'
    },
    {
      icon: Puzzle,
      title: 'Piece Together',
      description: 'Collect evidence to determine the weapon, person, and motive behind the murder.',
      details: ['Weapon identification', 'Suspect analysis', 'Motive discovery'],
      color: 'bg-green-100 text-green-800',
      bgColor: 'bg-green-50'
    },
    {
      icon: Trophy,
      title: 'Win the Game',
      description: 'First team to solve the murder correctly wins the grand prize!',
      details: ['Speed matters', 'Accuracy counts', 'Team collaboration wins'],
      color: 'bg-yellow-100 text-yellow-800',
      bgColor: 'bg-yellow-50'
    }
  ]

  const scoringFactors = [
    {
      icon: Timer,
      title: 'Speed',
      description: 'How quickly you solve each location clue',
      points: 'Up to 100 pts'
    },
    {
      icon: CheckCircle,
      title: 'Accuracy',
      description: 'Correctness of your murder solution',
      points: 'Up to 500 pts'
    },
    {
      icon: Target,
      title: 'Completion',
      description: 'Visiting all 9 locations successfully',
      points: 'Up to 200 pts'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut }
    }
  }

  return (
    <section id="how-it-works" className="pt-40 py-24 bg-gradient-to-br from-blue-50 via-yellow-50 to-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            variants={itemVariants}
          >
            How the Mystery{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Unfolds
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            A thrilling journey through Toronto where teams race against time to solve a Cluedo-style murder mystery
          </motion.p>
        </motion.div>

        {/* Timeline Steps */}
        <motion.div 
          className="relative mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500 hidden lg:block" />
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:gap-12`}
                variants={itemVariants}
              >
                <div className="flex-1 lg:text-right lg:pr-8 mb-8 lg:mb-0">
                  <Card className={`border-0 shadow-xl ${step.bgColor}`}>
                    <CardContent className="p-8">
                      {/* Step Number Badge */}
                      <div className="flex justify-end mb-6">
                        <Badge className={`${step.color} text-lg font-bold px-4 py-2`}>
                          Step {index + 1}
                        </Badge>
                      </div>
                      
                      {/* Icon and Title */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`p-4 rounded-full ${step.color}`}>
                          <step.icon className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                      </div>
                      
                      {/* Description */}
                      <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                        {step.description}
                      </p>
                      
                      {/* Details List */}
                      <ul className="space-y-3">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-600">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline Node */}
                <motion.div 
                  className="relative z-10 hidden lg:block"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center shadow-lg`}>
                    <step.icon className="h-8 w-8" />
                  </div>
                </motion.div>

                <div className="flex-1 lg:pl-8 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scoring System */}
        <motion.div
          className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Scoring System
            </h3>
            <p className="text-lg text-gray-600">
              Points are awarded based on speed, accuracy, and completion
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {scoringFactors.map((factor, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 mb-4">
                  <factor.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{factor.title}</h4>
                <p className="text-gray-600 mb-3">{factor.description}</p>
                <Badge variant="outline" className="text-purple-600 border-purple-600">
                  {factor.points}
                </Badge>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-12 text-center"
            variants={itemVariants}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-semibold">
              <Trophy className="h-5 w-5" />
              Maximum Score: 800 Points
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 