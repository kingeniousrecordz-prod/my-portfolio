-- Run this in Supabase SQL Editor to fix uploads

-- Enable public access for storage bucket
-- Note: Replace 'uploads' with your actual bucket name if different

-- First, create the policy for authenticated users to upload
CREATE POLICY "Allow public uploads" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'uploads');

-- Also allow public reads
CREATE POLICY "Allow public reads" 
ON storage.objects 
FOR SELECT 
TO public 
USING (bucket_id = 'uploads');

-- If you want completely public uploads (dev only, not recommended for production):
-- CREATE POLICY "Allow anyone to upload" 
-- ON storage.objects 
-- FOR INSERT 
-- TO public 
-- WITH CHECK (bucket_id = 'uploads');

