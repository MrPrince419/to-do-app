# Todo PWA - Full-Stack Progressive Web App

A modern, full-featured todo application built with React 18, Vite, Supabase, and Chakra UI. Works offline and can be installed on your iPhone home screen!

## ✨ Features

- 🔐 **Magic Link Authentication** - Passwordless email sign-in via Supabase
- ✅ **Full CRUD Operations** - Add, edit, delete, and complete todos
- 🔄 **Real-time Updates** - See changes instantly across all devices
- 📱 **PWA Support** - Install on iPhone home screen and use like a native app
- 🌐 **Offline Support** - Works without internet connection
- 🎨 **Beautiful UI** - Clean, modern design with Chakra UI
- 🚀 **Fast & Lightweight** - Built with Vite for optimal performance

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: Chakra UI
- **Backend**: Supabase (PostgreSQL + Real-time + Auth)
- **PWA**: vite-plugin-pwa
- **Icons**: React Icons

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [Supabase](https://supabase.com/) account (free tier works great!)

## 🚀 Getting Started

### 1. Clone or Download the Project

Navigate to your project directory:
```bash
cd "test app"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

#### 3.1 Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create a free account
3. Click "New Project"
4. Fill in the project details:
   - **Name**: Todo PWA
   - **Database Password**: Choose a strong password
   - **Region**: Choose the closest to you
5. Click "Create new project" and wait for it to initialize

#### 3.2 Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** (gear icon) → **API**
2. Copy the following:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")

#### 3.3 Set Up the Database

1. In your Supabase dashboard, go to **SQL Editor** (lightning icon)
2. Click "New query"
3. Copy the entire contents of `supabase-schema.sql` from this project
4. Paste it into the SQL editor
5. Click "Run" to create the todos table and policies

#### 3.4 Configure Email Authentication

1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Make sure **Email** is enabled (it should be by default)
3. For development, you can use the default settings
4. For production, configure your SMTP settings under **Authentication** → **Email Templates**

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit the `.env` file and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace `your_supabase_project_url` and `your_supabase_anon_key` with the values you copied in step 3.2.

### 5. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📱 Installing on iPhone

### During Development
1. Make sure your iPhone and computer are on the same network
2. Find your computer's local IP address
3. Access the app on your iPhone using `http://YOUR_IP:5173`

### For Production
1. Build and deploy the app:
```bash
npm run build
npm run preview
```

2. Deploy to a hosting service (Vercel, Netlify, etc.)

3. On your iPhone:
   - Open Safari and navigate to your deployed app
   - Tap the Share button (square with arrow)
   - Scroll down and tap "Add to Home Screen"
   - Tap "Add"

The app will now appear on your home screen like a native app!

## 🏗️ Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

## 🎨 Creating PWA Icons

The app needs the following icon files in the `public` folder:
- `pwa-192x192.png` - 192x192px
- `pwa-512x512.png` - 512x512px
- `apple-touch-icon.png` - 180x180px

You can create these using any image editor or online tools like:
- [PWA Image Generator](https://www.pwabuilder.com/imageGenerator)
- [Favicon.io](https://favicon.io/)

## 📚 Project Structure

```
test app/
├── public/               # Static assets
│   ├── manifest.json    # PWA manifest
│   └── sw.js           # Service worker
├── src/
│   ├── components/     # React components
│   │   ├── AuthScreen.tsx
│   │   ├── TodoApp.tsx
│   │   ├── TodoInput.tsx
│   │   ├── TodoList.tsx
│   │   └── TodoItem.tsx
│   ├── hooks/          # Custom React hooks
│   │   ├── useAuth.ts
│   │   └── useTodos.ts
│   ├── lib/            # Utilities and config
│   │   └── supabase.ts
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # App entry point
│   ├── theme.ts        # Chakra UI theme
│   └── index.css       # Global styles
├── .env                # Environment variables (create this!)
├── .env.example        # Environment variables template
├── index.html          # HTML template
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
├── vite.config.ts      # Vite config
└── supabase-schema.sql # Database schema
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌟 Key Features Explained

### Magic Link Authentication
- No passwords needed!
- Users receive an email with a secure link
- Click the link to sign in automatically
- Session persists across page reloads

### Real-time Updates
- Uses Supabase's real-time subscriptions
- Changes sync instantly across all devices
- No need to refresh the page

### Offline Support
- Todos are cached in localStorage
- Works without internet connection
- Syncs automatically when back online

### PWA Features
- Install on home screen (iOS & Android)
- Works in standalone mode
- Offline functionality
- App-like experience

## 🐛 Troubleshooting

### Authentication Issues
- Make sure your Supabase credentials are correct in `.env`
- Check that email provider is enabled in Supabase dashboard
- For development, check your spam folder for magic link emails

### Real-time Not Working
- Verify that you ran the `supabase-schema.sql` script
- Check that Row Level Security policies are enabled
- Make sure the realtime publication is set up correctly

### PWA Not Installing
- Ensure the app is served over HTTPS (production)
- Check that all icon files exist in the `public` folder
- Verify `manifest.json` is properly configured

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Supabase](https://supabase.com/)
- [Chakra UI](https://chakra-ui.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

Made with ❤️ using React, Supabase, and Chakra UI

