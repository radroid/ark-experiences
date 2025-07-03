// Database table types
export interface Contact {
  id: string
  company_name: string
  contact_person: string
  email: string
  phone?: string
  team_size?: number
  preferred_date?: string
  special_requirements?: string
  created_at: string
  status: 'new' | 'contacted' | 'converted'
}

export interface Review {
  id: string
  company_name: string
  reviewer_name: string
  rating: number
  review_text: string
  image_url?: string
  created_at: string
  is_featured: boolean
}

export interface GalleryImage {
  id: string
  title: string
  description?: string
  image_url: string
  thumbnail_url: string
  created_at: string
  is_featured: boolean
}

export interface Video {
  id: string
  title: string
  description?: string
  video_url: string
  thumbnail_url: string
  created_at: string
  is_hero_video: boolean
}

// Form types
export interface ContactFormData {
  company_name: string
  contact_person: string
  email: string
  phone?: string
  team_size?: number
  preferred_date?: string
  special_requirements?: string
}

export interface ReviewFormData {
  company_name: string
  reviewer_name: string
  rating: number
  review_text: string
  image_url?: string
}

// Component props types
export interface SectionProps {
  className?: string
  children?: React.ReactNode
}

export interface AnimationVariants {
  hidden: object
  visible: object
}

// Location type for scavenger hunt
export interface Location {
  id: number
  name: string
  description: string
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  clue_type: 'location' | 'murder'
  image_url?: string
}
