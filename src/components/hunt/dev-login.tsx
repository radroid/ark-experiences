'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DEV_MODE, DEV_USERS, MOCK_HUNT_USERS, MockUser } from '@/lib/dev-auth'
import { User, Code, AlertTriangle } from 'lucide-react'

interface DevLoginProps {
  onDevLogin: (user: MockUser) => void
}

export function DevLogin({ onDevLogin }: DevLoginProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!DEV_MODE) {
    return null
  }

  return (
    <Card className="max-w-md mx-auto mb-6 border-orange-200 bg-orange-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-orange-600" />
            <CardTitle className="text-lg text-orange-800">Dev Mode</CardTitle>
          </div>
          <Badge variant="outline" className="text-orange-600 border-orange-300">
            Development
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-orange-600">
          <AlertTriangle className="w-4 h-4" />
          <span>Quick login for testing</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant="outline"
          className="w-full border-orange-300 text-orange-700 hover:bg-orange-100"
        >
          {isExpanded ? 'Hide' : 'Show'} Dev Login Options
        </Button>

        {isExpanded && (
          <div className="space-y-2">
            <p className="text-xs text-orange-600 mb-3">
              Click any user below to instantly sign in (no email required):
            </p>
            
            {DEV_USERS.map((user) => {
              const huntUser = MOCK_HUNT_USERS[user.email as keyof typeof MOCK_HUNT_USERS]
              return (
                <Button
                  key={user.id}
                  onClick={() => onDevLogin(user)}
                  variant="outline"
                  className="w-full justify-start border-orange-200 hover:bg-orange-100 text-left"
                >
                  <User className="w-4 h-4 mr-2 text-orange-600" />
                  <div className="flex flex-col items-start">
                    <span className="font-medium text-orange-800">{user.name}</span>
                    <span className="text-xs text-orange-600">{user.email}</span>
                    {huntUser && (
                      <div className="flex gap-1 mt-1">
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                          Approved
                        </Badge>
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                          Waiver Signed
                        </Badge>
                      </div>
                    )}
                  </div>
                </Button>
              )
            })}

            <div className="pt-2 border-t border-orange-200">
              <p className="text-xs text-orange-500">
                💡 <strong>Tip:</strong> These users bypass Supabase auth and database checks.
                Perfect for testing the hunt flow without setting up the full backend.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
