# ARK Scavenger Hunt - Setup Guide

This guide will help you set up and deploy the mobile scavenger hunt application.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Set up Supabase
1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Set up the database tables (see `SUPABASE_SCHEMA.md`)

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Run the Development Server
```bash
pnpm dev
```

Navigate to `/hunting` on a mobile device to test the application.

## 📱 Features

### ✅ Implemented
- **Mobile-Only Access**: Desktop users see a friendly message directing them to mobile
- **Supabase Authentication**: Magic link email authentication
- **Progressive Unlock System**: Locations unlock sequentially as users complete them
- **Multi-Format Answers**: Support for text, image, audio, and video submissions
- **Progress Tracking**: Visual progress bar and completion tracking
- **User Access Control**: Only approved users with signed waivers can participate
- **Responsive Design**: Optimized for mobile devices

### 🔧 Ready for Integration
- **LLM Answer Validation**: Framework ready for OpenAI/Claude integration
- **File Upload**: Infrastructure for handling media submissions
- **Hunt Progress Persistence**: State saved to Supabase database

## 🎯 Hunt Flow

1. **Authentication**: Users sign in with approved email addresses
2. **Access Verification**: System checks if user is approved and has signed waiver
3. **Hunt Progression**: Users complete locations sequentially
4. **Answer Submission**: Multiple format support (text/image/audio/video)
5. **Validation**: LLM-powered answer checking (placeholder implemented)
6. **Progress Tracking**: Real-time progress updates and completion status

## 🛠 Configuration

### Hunt Locations
Edit `src/lib/hunt-data.ts` to customize:
- Location titles and descriptions
- Map images
- Correct answers
- Number of locations (currently set to 7)

### Approved Users
Add approved participants to Supabase:
```sql
INSERT INTO hunt_users (email, is_approved, has_signed_waiver) VALUES
('participant@example.com', true, true);
```

### LLM Integration
Update the `validateAnswer` function in `src/lib/hunt-data.ts` to integrate with your preferred LLM service:

```typescript
private async validateAnswer(location: HuntLocation, answer: HuntAnswer): Promise<boolean> {
  // Add your LLM integration here
  // Examples:
  // - OpenAI GPT-4 Vision for image analysis
  // - OpenAI Whisper for audio transcription
  // - Custom prompts for text validation
}
```

## 📂 Project Structure

```
src/
├── app/hunting/           # Hunt application pages
├── components/hunt/       # Hunt-specific components
├── components/ui/         # Reusable UI components
├── lib/
│   ├── auth.ts           # Authentication utilities
│   ├── device-detection.ts # Mobile detection
│   ├── hunt-data.ts      # Hunt logic and data management
│   └── supabase.ts       # Supabase client configuration
└── types/index.ts        # TypeScript type definitions
```

## 🔐 Security Features

- **Row Level Security**: Users can only access their own data
- **Email Verification**: Magic link authentication
- **Access Control**: Approved users only
- **Waiver Verification**: Ensures legal compliance
- **Mobile-Only Access**: Prevents desktop cheating

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
```

## 📊 Analytics & Monitoring

- Built-in Vercel Analytics and Speed Insights
- Supabase provides database monitoring
- Error tracking through console logging (enhance with Sentry if needed)

## 🎨 Customization

### Styling
- Uses Tailwind CSS for styling
- Shadcn/ui components for consistent design
- Easily customizable color scheme and branding

### Branding
- Update logo in `/public/ark-logo.png`
- Modify colors in Tailwind configuration
- Update text content in components

## 🤝 Support

For questions or issues:
1. Check the database schema in `SUPABASE_SCHEMA.md`
2. Review the hunt logic in `src/lib/hunt-data.ts`
3. Test authentication flows in development
4. Verify mobile responsiveness on actual devices

## 🔄 Future Enhancements

- Real-time multiplayer features
- Team-based hunts
- Advanced analytics dashboard
- Push notifications
- Offline mode support
- Photo/video compression
- Admin dashboard for hunt management
