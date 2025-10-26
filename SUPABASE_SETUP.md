# Supabase Setup Guide

This guide will help you set up Supabase for your portfolio project.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `my-portfolio` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
6. Click "Create new project"
7. Wait for the project to be created (usually takes 1-2 minutes)

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)
   - **service_role** key (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## 3. Set Up Environment Variables

Create a `.env.local` file in your project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Important**: Replace the placeholder values with your actual Supabase credentials.

## 4. Set Up the Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `supabase-schema.sql` (included in this project)
4. Click "Run" to execute the SQL

This will create all the necessary tables for your portfolio.

## 5. Set Up File Storage

1. In your Supabase dashboard, go to **Storage**
2. Click "Create a new bucket"
3. Name it `uploads`
4. Make it **Public** (so uploaded files can be accessed via URL)
5. Click "Create bucket"

## 6. Create the Default Admin User

1. Go to **SQL Editor** again
2. Run this query to create the default admin user:

```sql
INSERT INTO admin_users (username, password_hash) 
VALUES ('admin', '$2a$10$rQZ8k7QZ8k7QZ8k7QZ8k7OeQZ8k7QZ8k7QZ8k7QZ8k7QZ8k7QZ8k7Q')
ON CONFLICT (username) DO NOTHING;
```

**Default credentials:**
- Username: `admin`
- Password: `admin123`

**⚠️ IMPORTANT**: Change these credentials immediately after setup!

## 7. Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000/admin/login`
3. Try logging in with the default credentials
4. Test creating a project or beat to verify file uploads work

## 8. Deploy to Production

When deploying to Vercel:

1. Go to your Vercel project settings
2. Add the same environment variables in **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

3. Redeploy your project

## Troubleshooting

### Common Issues:

1. **"Invalid API key" error**: Double-check your environment variables
2. **"Bucket not found" error**: Make sure you created the `uploads` bucket
3. **Database connection errors**: Verify your project URL and keys are correct
4. **File upload fails**: Check that the `uploads` bucket is public

### Getting Help:

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

## Security Notes

- Never commit your `.env.local` file to version control
- Use the service role key only on the server side
- Consider implementing proper authentication instead of the simple admin system
- Regularly rotate your API keys
- Use Row Level Security (RLS) policies for production

## Next Steps

After setup, you can:
- Customize your portfolio content
- Add more features like contact forms
- Implement proper user authentication
- Add analytics and monitoring
- Set up automated backups
