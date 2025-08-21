-- Complete Database Setup for ARK Scavenger Hunt
-- Run this in your Supabase SQL Editor

-- ==============================================
-- 1. CREATE TABLES
-- ==============================================

-- Hunt Users Table (stores approved participants)
CREATE TABLE IF NOT EXISTS hunt_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  is_approved BOOLEAN DEFAULT false,
  has_signed_waiver BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hunt Progress Table (tracks user progress through locations)
CREATE TABLE IF NOT EXISTS hunt_progress (
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

-- Hunt Locations Table (optional - stores location data)
CREATE TABLE IF NOT EXISTS hunt_locations (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  map_image_url TEXT,
  correct_answer TEXT,
  order_index INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- 2. ENABLE ROW LEVEL SECURITY
-- ==============================================

ALTER TABLE hunt_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE hunt_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE hunt_locations ENABLE ROW LEVEL SECURITY;

-- ==============================================
-- 3. CREATE RLS POLICIES
-- ==============================================

-- Hunt Users Policies
DROP POLICY IF EXISTS "Users can view their own data" ON hunt_users;
CREATE POLICY "Users can view their own data" ON hunt_users
  FOR SELECT USING (auth.jwt() ->> 'email' = email);

-- Hunt Progress Policies  
DROP POLICY IF EXISTS "Users can manage their own progress" ON hunt_progress;
CREATE POLICY "Users can manage their own progress" ON hunt_progress
  FOR ALL USING (auth.uid() = user_id);

-- Hunt Locations Policies (allow all authenticated users to read)
DROP POLICY IF EXISTS "Authenticated users can read locations" ON hunt_locations;
CREATE POLICY "Authenticated users can read locations" ON hunt_locations
  FOR SELECT TO authenticated USING (true);

-- ==============================================
-- 4. CREATE TRIGGERS
-- ==============================================

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Apply trigger to hunt_progress table
DROP TRIGGER IF EXISTS update_hunt_progress_updated_at ON hunt_progress;
CREATE TRIGGER update_hunt_progress_updated_at 
  BEFORE UPDATE ON hunt_progress 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================
-- 5. INSERT TEST DATA
-- ==============================================

-- Insert Development Test Users
INSERT INTO hunt_users (email, is_approved, has_signed_waiver) VALUES
('test@example.com', true, true),
('admin@example.com', true, true),
('participant@example.com', true, true),
('dev@arkexperience.com', true, true),
('tester@arkexperience.com', true, true)
ON CONFLICT (email) DO UPDATE SET
  is_approved = EXCLUDED.is_approved,
  has_signed_waiver = EXCLUDED.has_signed_waiver;

-- Insert Hunt Locations
INSERT INTO hunt_locations (title, description, map_image_url, correct_answer, order_index) VALUES
('Study Room', 'Lorem Ipsum some description that can go here. It can then continue and possibly summarize what this location has?', '/gallery/team1-location2.jpg', 'Re-Reading Cafe', 1),
('The Mystery Begins', 'Follow the clues to uncover the first piece of the puzzle. Look carefully at your surroundings.', NULL, 'library', 2),
('Hidden Chamber', 'The ancient secrets lie within these walls. Can you decode the message?', NULL, 'archives', 3),
('The Final Clue', 'All paths lead here. Use everything you''ve learned to solve the ultimate puzzle.', NULL, 'treasure', 4),
('Treasure Room', 'Congratulations! You''ve found the treasure. But can you unlock it?', NULL, 'victory', 5),
('Secret Passage', 'Not all is as it seems. Sometimes you must look beyond the obvious.', NULL, 'passage', 6),
('Victory', 'You''ve completed the ultimate challenge. Well done, adventurer!', NULL, 'completed', 7)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  map_image_url = EXCLUDED.map_image_url,
  correct_answer = EXCLUDED.correct_answer,
  order_index = EXCLUDED.order_index;

-- ==============================================
-- 6. VERIFY SETUP
-- ==============================================

-- Check if tables were created successfully
SELECT 'hunt_users table created' as status, count(*) as user_count FROM hunt_users;
SELECT 'hunt_locations table created' as status, count(*) as location_count FROM hunt_locations;
SELECT 'hunt_progress table created' as status FROM hunt_progress LIMIT 1;

-- Show test users
SELECT 
  email, 
  is_approved, 
  has_signed_waiver, 
  created_at 
FROM hunt_users 
ORDER BY email;

-- Show locations
SELECT 
  id,
  title, 
  order_index,
  correct_answer
FROM hunt_locations 
ORDER BY order_index;
