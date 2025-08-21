# 🧪 Local Testing Guide for Scavenger Hunt

## 🚀 **Quick Start for Local Development**

### **1. Test Without Any Setup (Recommended)**
The easiest way to test the hunt functionality:

```bash
# Start the development server
pnpm dev

# Visit the hunt page on desktop (for testing)
http://localhost:3000/hunting
```

**✨ Dev Mode Features:**
- **No Supabase setup required** - everything works offline
- **No environment variables needed** - bypasses all external dependencies  
- **Instant login** - click any test user to sign in immediately
- **Mock data** - uses local hunt data and progress
- **Desktop testing** - you can test on desktop (dev mode only)

### **2. Test Users Available**

When you visit `/hunting` in development, you'll see a **Dev Mode** panel with these test users:

| User | Email | Status |
|------|-------|--------|
| **Test User 1** | `test@example.com` | ✅ Approved & Waiver Signed |
| **Admin User** | `admin@example.com` | ✅ Approved & Waiver Signed |
| **Hunt Participant** | `participant@example.com` | ✅ Approved & Waiver Signed |

### **3. How to Test**

1. **Start the app**: `pnpm dev`
2. **Visit hunt page**: Go to `http://localhost:3000/hunting`
3. **See dev panel**: Orange "Dev Mode" card will appear at the top
4. **Click "Show Dev Login Options"**
5. **Pick a test user**: Click any user to instantly sign in
6. **Test the hunt**: All features work without any backend setup!

## 🔧 **What Works in Dev Mode**

### ✅ **Fully Functional**
- Progressive location unlocking
- Answer submission (all formats: text/image/audio/video)
- Progress tracking and completion
- Mobile UI testing (works on desktop too in dev mode)
- Hunt state management
- User authentication flow

### 🔄 **Simulated/Mocked**
- User authentication (bypasses Supabase)
- Database operations (uses local state)
- LLM answer validation (simple text matching)
- File uploads (accepted but not processed)

## 📱 **Mobile Testing**

### **Option 1: Desktop Simulation (Dev Mode)**
- Dev mode removes the mobile-only restriction
- Test all functionality on your desktop browser
- Perfect for development and debugging

### **Option 2: Real Mobile Testing**
```bash
# Find your local IP address
ipconfig getifaddr en0  # macOS
# or
hostname -I  # Linux

# Start server accessible on network
pnpm dev -- --hostname 0.0.0.0

# Visit from mobile device
http://YOUR_IP_ADDRESS:3000/hunting
```

## 🏗 **Advanced Testing (With Real Backend)**

If you want to test with real Supabase integration:

### **1. Set up Environment Variables**
Create `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
```

### **2. Set up Database**
- Follow instructions in `SUPABASE_SCHEMA.md`
- Add test users to `hunt_users` table

### **3. Test Real Authentication**
- Dev mode panel will still show for quick testing
- But you can also test real email magic links
- Real database persistence will work

## 🐛 **Common Testing Scenarios**

### **Test Hunt Flow**
1. Sign in with any dev user
2. Complete Location 1 by submitting any answer
3. See Location 2 unlock automatically
4. Progress through all 7 locations
5. See completion celebration

### **Test Answer Validation**
- **Text answers**: Try "Re-Reading Cafe" for Location 1 (should work)
- **Media answers**: Upload any image/audio/video (accepted in dev mode)
- **Wrong answers**: Try random text (should be rejected)

### **Test Mobile Detection**
1. Resize browser to mobile size
2. Or visit from actual mobile device  
3. Dev mode bypasses restrictions for testing

### **Test Authentication States**
- Not signed in → See sign-in form with dev options
- Signed in but not approved → See access restriction
- Signed in and approved → See hunt interface

## 🔍 **Debugging Tips**

### **Check Browser Console**
- All hunt operations are logged
- Look for errors or state changes
- Network tab shows simulated API calls

### **Inspect Dev Tools**
- Mobile device simulation
- Network throttling for slow connections
- Local storage shows hunt progress

### **Reset Test State**
- Sign out and sign back in to reset progress
- Refresh page to clear local state
- No database cleanup needed in dev mode

## ⚡ **Pro Tips**

1. **Use different test users** to simulate multiple participants
2. **Test on multiple devices** to ensure responsive design
3. **Try different answer formats** to test upload flows
4. **Complete full hunt journey** to test celebration screen
5. **Test error states** by trying invalid operations

## 🚨 **Production Differences**

When deploying to production:
- Dev mode panel won't appear (`NODE_ENV=production`)
- Real Supabase authentication required
- Mobile-only restriction enforced
- Real file upload processing needed
- LLM integration for answer validation

This dev setup lets you test 95% of the functionality without any external dependencies! 🎉
