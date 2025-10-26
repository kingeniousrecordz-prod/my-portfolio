# Personal Portfolio Website

A modern, powerful personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features an admin panel for content management, showcasing web development projects, graphic design work, and music production.

## 🚀 Features

### Frontend
- **Modern Design**: Clean, responsive design with dark theme and smooth animations
- **Portfolio Sections**: 
  - Home page with hero section and recent work preview
  - Projects showcase with filtering and detailed information
  - Beats/music section with audio player functionality
  - About page with skills and experience
  - Contact form with validation
- **Responsive**: Fully responsive design that works on all devices
- **Animations**: Smooth animations using Framer Motion
- **SEO Optimized**: Built with Next.js for optimal performance and SEO

### Admin Panel
- **Content Management**: Add, edit, and delete projects and beats
- **File Upload**: Upload images and audio files
- **Authentication**: Secure admin login system
- **Real-time Updates**: Changes reflect immediately on the frontend
- **Settings Management**: Update site information and settings

### Technical Features
- **Database**: SQLite database with better-sqlite3
- **API Routes**: RESTful API for all CRUD operations
- **Type Safety**: Full TypeScript implementation
- **Modern Stack**: Next.js 14, React 18, Tailwind CSS
- **Authentication**: bcrypt password hashing

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: SQLite with better-sqlite3
- **Authentication**: bcryptjs
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd personal-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Admin Access

The admin panel is accessible at `/admin/login` with these default credentials:
- **Username**: `admin`
- **Password**: `admin123`

**Important**: Change these credentials immediately after deployment!

## 📁 Project Structure

```
personal-portfolio/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── projects/      # Project CRUD operations
│   │   ├── beats/        # Beat CRUD operations
│   │   ├── auth/         # Authentication
│   │   └── upload/       # File upload
│   ├── admin/             # Admin panel pages
│   ├── about/             # About page
│   ├── projects/          # Projects page
│   ├── beats/             # Beats page
│   ├── contact/           # Contact page
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Navigation.tsx     # Main navigation
│   └── Footer.tsx         # Site footer
├── lib/                   # Utility functions
│   └── database.ts        # Database setup
├── public/                # Static assets
│   └── uploads/           # Uploaded files
└── package.json           # Dependencies
```

## 🎨 Customization

### Adding Your Content

1. **Profile Information**: Update the hero section in `app/page.tsx`
2. **About Page**: Modify `app/about/page.tsx` with your information
3. **Contact Details**: Update contact information in `app/contact/page.tsx`
4. **Social Links**: Update social media links in navigation and footer

### Styling

- **Colors**: Modify the color scheme in `tailwind.config.js`
- **Fonts**: Update font families in the Tailwind config
- **Components**: Customize component styles in `app/globals.css`

### Database

The database is automatically created with these tables:
- `projects`: Web development projects
- `beats`: Music productions
- `admin_users`: Admin authentication
- `site_settings`: Site configuration

## 📤 Adding Content

### Via Admin Panel
1. Login to `/admin/login`
2. Navigate to Projects or Beats tab
3. Click "Add Project" or "Add Beat"
4. Fill in the form and submit

### Via API
You can also add content programmatically using the API endpoints:
- `POST /api/projects` - Create a new project
- `POST /api/beats` - Create a new beat
- `GET /api/projects` - Fetch all projects
- `GET /api/beats` - Fetch all beats

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔧 Environment Variables

Create a `.env.local` file for production:
```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://yourdomain.com
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, feel free to reach out:
- Email: contact@example.com
- GitHub: [Your GitHub Profile]

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
