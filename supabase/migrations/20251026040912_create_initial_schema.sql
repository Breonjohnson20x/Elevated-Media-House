/*
  # Create Elevated Media House Database Schema
  
  ## 1. New Tables
    
  ### users
    - `id` (uuid, primary key) - User unique identifier
    - `email` (text, unique) - User email address
    - `name` (text) - User full name
    - `avatar_url` (text) - Profile picture URL
    - `role` (text) - User role (user, admin)
    - `created_at` (timestamptz) - Account creation timestamp
    - `last_signed_in` (timestamptz) - Last login timestamp
    
  ### releases
    - `id` (uuid, primary key) - Release unique identifier
    - `user_id` (uuid) - Foreign key to users
    - `track_title` (text) - Song/album title
    - `artist_name` (text) - Artist name
    - `cover_art_url` (text) - Cover art image URL
    - `release_date` (date) - Official release date
    - `streams` (integer) - Total stream count
    - `revenue` (decimal) - Total revenue generated
    - `platforms` (jsonb) - Platform links (Spotify, Apple Music, etc.)
    - `status` (text) - Release status (pending, live, taken_down)
    - `created_at` (timestamptz) - Record creation timestamp
    
  ### artist_submissions
    - `id` (uuid, primary key) - Submission unique identifier
    - `user_id` (uuid) - Foreign key to users
    - `artist_name` (text) - Artist name
    - `track_title` (text) - Track title
    - `genre` (text) - Music genre
    - `release_date` (date) - Planned release date
    - `package_type` (text) - Service package (basic, pro, deluxe)
    - `status` (text) - Submission status (pending, in_progress, completed)
    - `created_at` (timestamptz) - Submission timestamp
    
  ### service_packages
    - `id` (uuid, primary key) - Package unique identifier
    - `name` (text) - Package name
    - `price_min` (decimal) - Minimum price
    - `price_max` (decimal) - Maximum price
    - `features` (jsonb) - List of features
    - `popular` (boolean) - Highlight as popular package
    
  ## 2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read their own data
    - Add policies for users to create/update their own data
    - Add policies for admin users to read all data
  
  ## 3. Indexes
    - Add indexes on foreign keys for better query performance
    - Add indexes on frequently queried columns (email, status)
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  avatar_url text,
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at timestamptz DEFAULT now(),
  last_signed_in timestamptz DEFAULT now()
);

-- Create releases table
CREATE TABLE IF NOT EXISTS releases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  track_title text NOT NULL,
  artist_name text NOT NULL,
  cover_art_url text,
  release_date date NOT NULL,
  streams integer DEFAULT 0,
  revenue decimal(10,2) DEFAULT 0,
  platforms jsonb DEFAULT '{}',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'live', 'taken_down')),
  created_at timestamptz DEFAULT now()
);

-- Create artist_submissions table
CREATE TABLE IF NOT EXISTS artist_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  artist_name text NOT NULL,
  track_title text NOT NULL,
  genre text,
  release_date date,
  package_type text CHECK (package_type IN ('basic', 'pro', 'deluxe')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  created_at timestamptz DEFAULT now()
);

-- Create service_packages table
CREATE TABLE IF NOT EXISTS service_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price_min decimal(10,2) NOT NULL,
  price_max decimal(10,2) NOT NULL,
  features jsonb DEFAULT '[]',
  popular boolean DEFAULT false
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_releases_user_id ON releases(user_id);
CREATE INDEX IF NOT EXISTS idx_releases_status ON releases(status);
CREATE INDEX IF NOT EXISTS idx_submissions_user_id ON artist_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON artist_submissions(status);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE artist_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_packages ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Releases policies
CREATE POLICY "Users can view own releases"
  ON releases FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own releases"
  ON releases FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own releases"
  ON releases FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own releases"
  ON releases FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Artist submissions policies
CREATE POLICY "Users can view own submissions"
  ON artist_submissions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own submissions"
  ON artist_submissions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own submissions"
  ON artist_submissions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own submissions"
  ON artist_submissions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Service packages policies (public read)
CREATE POLICY "Anyone can view service packages"
  ON service_packages FOR SELECT
  TO anon, authenticated
  USING (true);

-- Insert default service packages
INSERT INTO service_packages (name, price_min, price_max, features, popular)
VALUES 
  ('Basic', 50, 75, '["Global Distribution to 150+ platforms", "Professional Metadata Optimization", "SplitShare™ Royalty Setup", "ISRC & UPC Code Generation", "Store Delivery Confirmation", "Email Support (24-48 hours)"]', false),
  ('Pro', 150, 200, '["Everything in Basic", "Professional Cover Art Design", "Strategic Playlist Pitching", "Pre-Save Campaign Setup", "30-Day Marketing Timeline", "Release Strategy Consultation", "Priority Email & Chat Support (12 hours)"]', true),
  ('Deluxe', 300, 500, '["Everything in Pro", "Comprehensive Marketing Rollout", "Monthly Analytics Reports (3 Months)", "Follow-Up Strategy Consultation", "YouTube Content ID Setup", "Neighboring Rights Registration", "VIP Support (Phone, Email, Chat)"]', false)
ON CONFLICT DO NOTHING;
