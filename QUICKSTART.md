# 🚀 Quick Start Guide

Follow these steps to get your Todo PWA up and running in minutes!

## Step 1: Install Node.js (if not already installed)

Download and install Node.js from [https://nodejs.org/](https://nodejs.org/)

To verify installation, open a terminal and run:
```bash
node --version
npm --version
```

## Step 2: Install Dependencies

Open a terminal in this project folder and run:
```bash
npm install
```

This will download all required packages.

## Step 3: Set Up Supabase (5 minutes)

### 3a. Create a Supabase Account
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project

### 3b. Set Up the Database
1. In your Supabase dashboard, click on "SQL Editor"
2. Open the `supabase-schema.sql` file from this project
3. Copy all the SQL code
4. Paste it into the Supabase SQL Editor
5. Click "Run" to create the database table

### 3c. Get Your API Keys
1. Go to Settings → API in your Supabase dashboard
2. Copy your "Project URL" and "anon/public" key

### 3d. Configure Environment Variables
1. Create a file named `.env` in this project folder
2. Add these lines (replace with your actual keys):
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 4: Run the App

```bash
npm run dev
```

Open your browser to `http://localhost:5173`

## Step 5: Test It Out!

1. Enter your email address
2. Check your email for the magic link
3. Click the link to sign in
4. Start adding todos!

## 🎯 Next Steps

- **Create PWA Icons**: See `ICONS-SETUP.md` for instructions
- **Deploy**: Use Vercel, Netlify, or any static hosting service
- **Install on Phone**: Once deployed, add to your iPhone home screen!

## 🆘 Need Help?

Check the full `README.md` for detailed documentation and troubleshooting tips.

---

That's it! You're ready to use your Todo PWA! 🎉

