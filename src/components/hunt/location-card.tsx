'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { HuntLocation, HuntAnswer } from '@/types'
import { Camera, Mic, Upload, FileText, MapPin } from 'lucide-react'
import Image from 'next/image'

interface LocationCardProps {
  location: HuntLocation
  onSubmitAnswer: (locationId: number, answer: HuntAnswer) => void
  isSubmitting?: boolean
}

export function LocationCard({ location, onSubmitAnswer, isSubmitting = false }: LocationCardProps) {
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'audio' | 'video'>('text')
  const [textAnswer, setTextAnswer] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleSubmit = () => {
    if (activeTab === 'text' && textAnswer.trim()) {
      onSubmitAnswer(location.id, {
        type: 'text',
        content: textAnswer.trim(),
        submittedAt: new Date().toISOString()
      })
    } else if (selectedFile) {
      onSubmitAnswer(location.id, {
        type: activeTab,
        content: selectedFile,
        submittedAt: new Date().toISOString()
      })
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const isSubmitDisabled = () => {
    if (activeTab === 'text') {
      return !textAnswer.trim() || isSubmitting
    }
    return !selectedFile || isSubmitting
  }

  if (!location.isUnlocked) {
    return (
      <Card className="mx-4 mb-6 opacity-50">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <MapPin className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-500">Location {location.order}</p>
          <p className="text-sm text-gray-400 mt-2">Complete previous locations to unlock</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mx-4 mb-6 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <MapPin className="w-4 h-4" />
          <span>{location.title}</span>
        </div>
        <CardTitle className="text-2xl font-bold text-blue-600">
          {location.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Location Description */}
        <p className="text-gray-700 leading-relaxed">
          {location.description}
        </p>

        {/* Map Preview */}
        {location.mapImageUrl && (
          <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={location.mapImageUrl}
              alt={`Map of ${location.title}`}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Answer Input Tabs */}
        <div className="space-y-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('text')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'text' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              Text
            </button>
            <button
              onClick={() => setActiveTab('image')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'image' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Camera className="w-4 h-4" />
              Image
            </button>
            <button
              onClick={() => setActiveTab('audio')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'audio' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Mic className="w-4 h-4" />
              Audio
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'video' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Upload className="w-4 h-4" />
              Video
            </button>
          </div>

          {/* Answer Input */}
          <div className="space-y-3">
            {activeTab === 'text' ? (
              <Input
                type="text"
                placeholder="Text Answer"
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                className="w-full"
                disabled={location.isCompleted}
              />
            ) : (
              <div className="space-y-2">
                <input
                  type="file"
                  accept={
                    activeTab === 'image' ? 'image/*' :
                    activeTab === 'audio' ? 'audio/*' :
                    'video/*'
                  }
                  onChange={handleFileSelect}
                  className="hidden"
                  id={`file-${location.id}-${activeTab}`}
                  disabled={location.isCompleted}
                />
                <label
                  htmlFor={`file-${location.id}-${activeTab}`}
                  className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                >
                  <Upload className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {selectedFile ? selectedFile.name : `Upload ${activeTab}`}
                  </span>
                </label>
              </div>
            )}

            {/* Submit Button */}
            {!location.isCompleted && (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitDisabled()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            )}

            {/* Completion Status */}
            {location.isCompleted && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium text-center">
                  ✅ Location Completed!
                </p>
                {location.userAnswer && (
                  <p className="text-green-600 text-sm text-center mt-1">
                    Your answer: {
                      location.userAnswer.type === 'text' 
                        ? String(location.userAnswer.content)
                        : `${location.userAnswer.type} file uploaded`
                    }
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
