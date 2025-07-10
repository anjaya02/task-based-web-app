# 🚀 Deployment Checklist

## Pre-Deployment

- [x] Code is committed and pushed to GitHub
- [x] JWT secret generated
- [x] CORS configuration updated
- [x] Build scripts configured

## Database Setup (MongoDB Atlas)

- [ ] MongoDB Atlas account created
- [ ] Database cluster created (free tier)
- [ ] Database user created with read/write permissions
- [ ] Network access configured (allow all IPs: 0.0.0.0/0)
- [ ] Connection string obtained

## Backend Deployment (Render)

- [ ] Render account created
- [ ] New Web Service created
- [ ] GitHub repository connected
- [ ] Root directory set to "server"
- [ ] Build command: "npm install"
- [ ] Start command: "npm start"
- [ ] Environment variables set:
  - [ ] NODE_ENV=production
  - [ ] PORT=10000
  - [ ] MONGODB_URI=(your Atlas connection string)
  - [ ] JWT_SECRET=(generated secret)
  - [ ] JWT_EXPIRES_IN=7d
- [ ] Service deployed successfully
- [ ] Backend URL obtained (e.g., https://taskmanager-api.onrender.com)

## Frontend Deployment (Vercel)

- [ ] Vercel account created
- [ ] New project created
- [ ] GitHub repository imported
- [ ] Root directory set to "client"
- [ ] Framework preset: Vite
- [ ] Build command: "npm run build"
- [ ] Output directory: "dist"
- [ ] Environment variables set:
  - [ ] VITE_API_URL=(your Render backend URL + /api)
- [ ] Project deployed successfully
- [ ] Frontend URL obtained (e.g., https://taskmanager-frontend.vercel.app)

## Post-Deployment Testing

- [ ] Frontend loads correctly
- [ ] User registration works
- [ ] User login works
- [ ] Task creation works
- [ ] Task editing works
- [ ] Task deletion works
- [ ] Filtering and sorting work
- [ ] All features tested on mobile

## Final Steps

- [ ] Update README.md with live demo links
- [ ] Test application thoroughly
- [ ] Document any production-specific notes
