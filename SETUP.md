# Prescripto Project Setup Guide

## Server URLs

The servers have been started in the background:

- **Backend Server**: http://localhost:4000
- **Frontend (User)**: http://localhost:5173
- **Admin Panel**: http://localhost:5174

## Environment Variables Required

Create a `.env` file in the `backend` directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/

# JWT Secret (use a strong random string)
JWT_SECRET=your_jwt_secret_key_here

# Admin Credentials
ADMIN_EMAIL=admin@prescripto.com
ADMIN_PASSWORD=admin123

# Cloudinary Configuration (for image uploads)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

# Server Port (optional, defaults to 4000)
PORT=4000
```

## Quick Start

1. **Create `.env` file** in the `backend` directory with the variables above
2. **Ensure MongoDB is running** (local or remote)
3. **Set up Cloudinary account** (optional - only needed for image uploads)
4. **Access the applications:**
   - Frontend: http://localhost:5173
   - Admin Panel: http://localhost:5174
   - Backend API: http://localhost:4000

## Important Notes

- If MongoDB is not connected, the backend will fail to start
- Cloudinary is optional - the app will work but image uploads won't function
- Admin credentials are set via environment variables
- All servers are running in the background

## Starting Servers Manually

If you need to restart the servers:

```bash
# Backend (in backend directory)
cd backend
npm start

# Frontend (in frontend directory)  
cd frontend
npm run dev

# Admin Panel (in admin directory)
cd admin
npm run dev
```

