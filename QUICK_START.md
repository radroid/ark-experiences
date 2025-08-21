# 🚀 Quick Start Guide - ARK Scavenger Hunt

## ⚡ **Instant Testing (No Setup Required)**

### **Step 1: Start the App**
```bash
pnpm dev
```

### **Step 2: Test the Hunt**
1. Visit: `http://localhost:3000/hunting`
2. Look for the orange **"Dev Mode"** panel at the top
3. Click **"Show Dev Login Options"**
4. Click any test user to instantly sign in
5. Start solving the hunt!

**✨ What Works Out of the Box:**
- ✅ Complete hunt functionality without any database
- ✅ Progressive location unlocking
- ✅ Answer validation (try "Re-Reading Cafe" for location 1)
- ✅ Progress tracking via localStorage
- ✅ All 7 locations with real hunt flow
- ✅ Desktop testing (dev mode bypasses mobile-only restriction)

---

## 🗄️ **Database Setup (For Production/Full Testing)**

If you want to test with real Supabase integration:

### **Step 1: Create Supabase Project**
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for it to finish setting up (2-3 minutes)

### **Step 2: Run Database Setup**
1. Go to your Supabase dashboard → **SQL Editor**
2. Copy and paste the entire contents of `DATABASE_SETUP_DEV.sql`
3. Click **Run** to execute the setup

### **Step 3: Set Environment Variables**
Create `.env.local` in your project root:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**To get these values:**
- Go to Settings → API in your Supabase dashboard
- Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- Copy **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Copy **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

### **Step 4: Restart and Test**
```bash
# Stop the dev server (Ctrl+C) and restart
pnpm dev
```

Now you'll have:
- ✅ Real database persistence
- ✅ Real email authentication
- ✅ Multi-user support
- ✅ Production-ready setup

---

## 🔧 **Troubleshooting**

### **"supabaseKey is required" Error**
This happens when environment variables aren't set. **Good news**: The app automatically falls back to dev mode! You'll see this in the console:
```
🧪 Using DevHuntManager (Supabase not configured)
```

**Solutions:**
1. **Keep using dev mode** - Everything works without Supabase
2. **Set up environment variables** following Step 3 above

### **Database Connection Errors**
The app gracefully handles Supabase connection issues:
```
🚨 Supabase error, falling back to dev mode
```

Your hunt will continue working with localStorage instead.

### **Dev Mode Not Showing**
Dev mode only appears when:
- `NODE_ENV === 'development'` 
- OR Supabase environment variables are missing

### **Mobile Testing**
**Option 1: Desktop Testing (Recommended for Development)**
- Dev mode removes mobile-only restriction
- Test everything on your desktop browser

**Option 2: Real Mobile Testing**
```bash
# Get your IP address
ipconfig getifaddr en0  # macOS
hostname -I             # Linux

# Start server on network
pnpm dev -- --hostname 0.0.0.0

# Visit from phone
http://YOUR_IP:3000/hunting
```

---

## 🎯 **Test Scenarios**

### **Complete Hunt Flow**
1. Sign in with "Test User 1"
2. Try location 1 answer: "Re-Reading Cafe" ✅
3. See location 2 unlock automatically
4. Try wrong answer: "wrong answer" ❌
5. Upload an image/video (auto-accepted in dev mode) ✅
6. Complete all 7 locations
7. See victory celebration 🎉

### **Multi-User Testing**
1. Sign out and sign in as different test users
2. Each user has their own progress
3. Test parallel hunts

### **Error Scenarios**
- Try submitting without selecting an answer
- Test network issues (disable wifi briefly)
- Test on different screen sizes

---

## 📊 **What's Happening Behind the Scenes**

### **Dev Mode (Default)**
```
[DevHuntManager] → localStorage → Instant testing
```
- No network requests
- Data saved locally
- Perfect for development

### **Production Mode (With Supabase)**
```
[HuntManager] → Supabase → Real database
```
- Real authentication
- Persistent data
- Multi-user support

### **Smart Fallback**
The app automatically detects what's available:
1. Try Supabase first
2. Fall back to dev mode if needed
3. Show clear logging in console

---

## 🎉 **You're Ready!**

Your scavenger hunt is fully functional right now. Whether you use:
- **Quick dev mode** (instant, no setup)
- **Full Supabase integration** (production-ready)

Both provide the complete hunt experience! 🕵️‍♀️

**Next Steps:**
- Customize location content in `src/lib/hunt-data-dev.ts`
- Add real map images to `/public/gallery/`
- Integrate LLM for smarter answer validation
- Deploy to production when ready
