# 🛡️ PRODUCTION DEPLOYMENT SETTINGS

## For RENDER Backend:

```
Environment Variables:
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
JWT_SECRET=dcb601344f159028127a2d9c03c59fdd1a37994ea1af672fe3e6939ffc8b7f140248abbc044890cbb67342d445d9ee3d3d1554d8d5abfd92ca3fcc4b4ce0bf281c5
JWT_EXPIRES_IN=30d
```

## For VERCEL Frontend:

```
Environment Variables:
VITE_API_URL=https://your-render-app.onrender.com/api
```

## ⏰ JWT Expiry Behavior:

### What Users Experience:

1. **Days 1-29**: Normal usage, stays logged in
2. **Day 30**: Token expires, user sees "Session expired" message
3. **User Action**: Logs in again (takes 5 seconds)
4. **Result**: Gets new 30-day token, continues normally

### Why This Is Good:

✅ **Security**: Old tokens can't be misused
✅ **User-Friendly**: 30 days is long enough for normal use
✅ **Automatic**: System handles everything gracefully
✅ **No Data Loss**: All tasks remain intact

## 🔍 Monitoring URLs:

- **Health Check**: https://your-render-app.onrender.com/health
- **API Status**: https://your-render-app.onrender.com/api/auth/profile (requires login)

## 🚨 Render Free Tier Limitations:

- **Sleep Mode**: App sleeps after 15 minutes of inactivity
- **Cold Start**: First request after sleep takes 10-30 seconds
- **Monthly Hours**: 750 hours/month (plenty for demo purposes)
- **Auto-Wake**: App wakes up on any request

## 💡 Pro Tips:

1. **For Assignment**: 30 days is perfect for evaluation period
2. **For Production**: Consider paid plan ($7/month) for always-on service
3. **Monitoring**: Health check endpoint helps track uptime
