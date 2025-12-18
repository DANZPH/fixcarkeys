# FixCarKeys Admin System Setup Guide

## Prerequisites
1. Node.js installed
2. Turso account with database created

## Environment Setup

Create a `.env.local` file in the project root with the following contents:

```env
# Turso Database
TURSO_DATABASE_URL=libsql://fixcarkeys-danzph.aws-eu-west-1.turso.io
TURSO_AUTH_TOKEN=your_turso_auth_token_here

# JWT Secret for Admin Auth (change this to a random string)
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Admin Credentials (change these!)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

## Getting Your Turso Auth Token

1. Install Turso CLI: `npm install -g turso`
2. Login: `turso auth login`
3. Get token: `turso db tokens create fixcarkeys-danzph`

## Running the Application

```bash
npm run dev
```

## Accessing the Admin Panel

1. Navigate to: `http://localhost:3000/admin`
2. Login with your admin credentials (default: admin / admin123)
3. Click "Init/Seed Database" button to populate the database with default data
4. Start managing your content!

## Admin Panel Features

### Site Settings
- Site name, tagline, and description
- Contact information (phone, email, address)
- Social media links
- Hero section statistics

### Services
- Add/Edit/Delete services
- Set icons, titles, descriptions
- Manage service features
- Upload service images

### Testimonials
- Manage customer reviews
- Add photos and ratings
- Sort order control

### Car Brands
- Add supported car brands
- Set logos and descriptions
- Control display order

### Service Areas
- Define coverage areas
- Add towns/cities for each area

### Blog Posts
- Create and manage blog articles
- Set categories and excerpts

## API Endpoints

- `GET /api/content` - Public endpoint for all site content
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET/POST /api/admin/settings` - Site settings
- `GET/POST/PUT/DELETE /api/admin/services` - Services CRUD
- `GET/POST/PUT/DELETE /api/admin/testimonials` - Testimonials CRUD
- `GET/POST/PUT/DELETE /api/admin/brands` - Brands CRUD
- `GET/POST/PUT/DELETE /api/admin/areas` - Areas CRUD
- `GET/POST/PUT/DELETE /api/admin/blog` - Blog posts CRUD

## Database Tables

The system creates the following tables automatically:
- `settings` - Key-value site configuration
- `services` - Service offerings
- `testimonials` - Customer reviews
- `brands` - Supported car brands
- `areas` - Service coverage areas
- `blog_posts` - Blog articles
- `media` - Uploaded files (future feature)

## Security Notes

1. **Change default credentials** before deploying to production
2. Use a strong, random JWT_SECRET
3. Keep your Turso auth token secure
4. Consider adding rate limiting for production
