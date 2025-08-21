# Supabase Database Schema for ARK Scavenger Hunt

This document outlines the database tables required for the scavenger hunt application.

## Tables

### 1. hunt_users
Stores approved users who can participate in the hunt.

```sql
CREATE TABLE hunt_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  is_approved BOOLEAN DEFAULT false,
  has_signed_waiver BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE hunt_users ENABLE ROW LEVEL SECURITY;

-- Users can only read their own data
CREATE POLICY "Users can view their own data" ON hunt_users
  FOR SELECT USING (auth.jwt() ->> 'email' = email);
```

### 2. hunt_progress
Tracks each user's progress through the hunt.

```sql
CREATE TABLE hunt_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  current_location_id INTEGER NOT NULL DEFAULT 1,
  completed_locations INTEGER[] DEFAULT '{}',
  answers JSONB DEFAULT '{}',
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE hunt_progress ENABLE ROW LEVEL SECURITY;

-- Users can only access their own progress
CREATE POLICY "Users can manage their own progress" ON hunt_progress
  FOR ALL USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER update_hunt_progress_updated_at 
  BEFORE UPDATE ON hunt_progress 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 3. hunt_locations (Optional - for dynamic content)
Stores the hunt location data (alternatively, this can be hardcoded in the frontend).

```sql
e. Well done, adventurer!', NULL, 'completed', 7);CREATE TABLE hunt_locations (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  map_image_url TEXT,
  correct_answer TEXT,
  order_index INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO hunt_locations (title, description, map_image_url, correct_answer, order_index) VALUES
('Study Room', 'Lorem Ipsum some description that can go here. It can then continue and possibly summarize what this location has?', '/gallery/team1-location2.jpg', 'Re-Reading Cafe', 1),
('The Mystery Begins', 'Follow the clues to uncover the first piece of the puzzle. Look carefully at your surroundings.', NULL, 'library', 2),
('Hidden Chamber', 'The ancient secrets lie within these walls. Can you decode the message?', NULL, 'archives', 3),
('The Final Clue', 'All paths lead here. Use everything you''ve learned to solve the ultimate puzzle.', NULL, 'treasure', 4),
('Treasure Room', 'Congratulations! You''ve found the treasure. But can you unlock it?', NULL, 'victory', 5),
('Secret Passage', 'Not all is as it seems. Sometimes you must look beyond the obvious.', NULL, 'passage', 6),
('Victory', 'You''ve completed the ultimate challeng
```

## Setup Instructions

1. **Enable Authentication in Supabase**
   - Go to Authentication > Settings
   - Enable email authentication
   - Configure email templates as needed

2. **Create the tables**
   - Run the SQL commands above in your Supabase SQL editor

3. **Environment Variables**
   Add these to your `.env.local` file:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Populate approved users**
   Insert approved user emails into the `hunt_users` table:
   ```sql
   INSERT INTO hunt_users (email, is_approved, has_signed_waiver) VALUES
   ('participant1@example.com', true, true),
   ('participant2@example.com', true, true);
   ```

## LLM Integration

For answer validation, you can integrate with:
- OpenAI GPT-4 Vision (for image/video analysis)
- OpenAI Whisper (for audio transcription)
- Custom prompt engineering for text validation

The `validateAnswer` function in `hunt-data.ts` is where you would add your LLM integration logic.

## Security Notes

- Row Level Security (RLS) is enabled to ensure users can only access their own data
- Use Supabase's built-in authentication for secure user management
- Store sensitive answer keys server-side or use environment variables
- Consider implementing rate limiting for answer submissions
