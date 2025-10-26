-- Supabase Database Schema for Portfolio Project

-- Note: The app.jwt_secret is automatically managed by Supabase
-- No need to set it manually

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  project_url TEXT,
  github_url TEXT,
  technologies TEXT,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create beats table
CREATE TABLE IF NOT EXISTS beats (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  audio_url TEXT NOT NULL,
  cover_image_url TEXT,
  genre TEXT,
  duration INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin user (password: admin123)
-- Note: You'll need to hash this password using bcrypt
INSERT INTO admin_users (username, password_hash) 
VALUES ('admin', '$2a$10$rQZ8k7QZ8k7QZ8k7QZ8k7OeQZ8k7QZ8k7QZ8k7QZ8k7QZ8k7QZ8k7Q')
ON CONFLICT (username) DO NOTHING;

-- Enable RLS (Row Level Security)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE beats ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access to beats" ON beats FOR SELECT USING (true);
CREATE POLICY "Allow public read access to site_settings" ON site_settings FOR SELECT USING (true);

-- Create policies for admin access (using service role key)
CREATE POLICY "Allow admin full access to projects" ON projects FOR ALL USING (true);
CREATE POLICY "Allow admin full access to beats" ON beats FOR ALL USING (true);
CREATE POLICY "Allow admin full access to admin_users" ON admin_users FOR ALL USING (true);
CREATE POLICY "Allow admin full access to site_settings" ON site_settings FOR ALL USING (true);
