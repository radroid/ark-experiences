'use client'

// Development-only authentication bypass
// DO NOT USE IN PRODUCTION

export const DEV_MODE = process.env.NODE_ENV === 'development'

export interface MockUser {
  id: string
  email: string
  name?: string
}

export const DEV_USERS: MockUser[] = [
  {
    id: 'dev-user-1',
    email: 'test@example.com',
    name: 'Test User 1'
  },
  {
    id: 'dev-user-2', 
    email: 'admin@example.com',
    name: 'Admin User'
  },
  {
    id: 'dev-user-3',
    email: 'participant@example.com', 
    name: 'Hunt Participant'
  }
]

export function createMockSession(user: MockUser) {
  return {
    user: {
      id: user.id,
      email: user.email,
      user_metadata: {
        name: user.name
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      aud: 'authenticated',
      role: 'authenticated'
    },
    access_token: 'mock-access-token',
    refresh_token: 'mock-refresh-token',
    expires_in: 3600,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    token_type: 'bearer'
  }
}

// Mock hunt user data for development
export const MOCK_HUNT_USERS = {
  'test@example.com': {
    id: 'hunt-user-1',
    email: 'test@example.com',
    isApproved: true,
    hasSignedWaiver: true,
    createdAt: new Date().toISOString()
  },
  'admin@example.com': {
    id: 'hunt-user-2', 
    email: 'admin@example.com',
    isApproved: true,
    hasSignedWaiver: true,
    createdAt: new Date().toISOString()
  },
  'participant@example.com': {
    id: 'hunt-user-3',
    email: 'participant@example.com', 
    isApproved: true,
    hasSignedWaiver: true,
    createdAt: new Date().toISOString()
  }
}
