# 🚀 Ryzenflow - Premium SaaS Dashboard & Goal/Habit Tracker

A **production-ready, premium SaaS application** built with React, TypeScript, and Tailwind CSS featuring a beautiful dashboard, goal tracking, habit tracking, and dark mode.

## ✨ Features

### 🌓 Dark/Light Mode
- Smooth animated theme toggle
- localStorage persistence
- System preference detection
- Full dark mode support across all components

### 🎯 Goal Tracking
- Create, edit, delete goals
- Progress bars with visual indicators
- Status management (Active/Completed)
- Category organization
- Deadline support

### 🔥 Habit Tracking
- Daily/weekly/monthly habits
- Daily checkbox completion
- Streak counter (auto-increment)
- Flame icons to visualize streaks
- Completion tracking per date

### 📊 Premium Dashboard
- Protected routes (authentication required)
- Responsive sidebar navigation
- Mobile hamburger menu
- Three main tabs: Overview, Goals, Habits
- Real-time statistics and progress

### ✨ Micro-Interactions
- Smooth button animations (hover effects, scale)
- Loading states with spinners
- Skeleton loaders for content
- Toast notifications (success, error, warning, info)
- Progress bars with animations
- Card hover effects

### 📱 Responsive Design
- Mobile-first approach
- Tablet optimization
- Desktop full experience
- Touch-friendly interface

---

## 🛠️ Tech Stack

```
Frontend:
- React 19.2.3
- TypeScript 5.3.3
- Tailwind CSS 3.4.1
- Lucide React (icons)

Build:
- Vite 5.1.0

Authentication & Backend:
- Firebase 10.8.0
- Firestore (ready to connect)

State Management:
- Context API
- localStorage

Deployment:
- GitHub (source control)
- Netlify (hosting)
```

---

## 📁 Project Structure

```
ryzenflow/
├── context/
│   ├── ThemeContext.tsx          # Dark/light mode
│   └── ToastContext.tsx          # Toast notifications
├── components/
│   ├── [Dashboard]
│   │   ├── AppDashboard.tsx
│   │   ├── DashboardLayout.tsx
│   │   ├── GoalsTracker.tsx
│   │   └── HabitsTracker.tsx
│   ├── [Reusable UI]
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── SkeletonLoader.tsx
│   │   └── ToastContainer.tsx
│   ├── [Auth]
│   │   ├── AuthForm.tsx
│   │   └── Profile.tsx
│   └── [Landing]
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       └── ...
├── types/
│   └── tracker.ts                # TypeScript interfaces
├── App.tsx                       # Main app router
├── firebase.ts                   # Firebase config
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Firebase account

### Installation

```bash
# Clone the repository
git clone https://github.com/VikramGanesh06/Ryzenflow.git
cd Ryzenflow

# Install dependencies
npm install

# Create .env.local with Firebase config
cp .env.example .env.local
# Update with your Firebase credentials

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Access the App
- Local: `http://localhost:5173`
- Landing page at `/`
- Dashboard at `/#dashboard` (after login)

---

## 📖 Documentation

Complete documentation is available in the repository:

1. **[QUICK_START.md](QUICK_START.md)** - User guide and feature overview
2. **[FEATURES_IMPLEMENTATION.md](FEATURES_IMPLEMENTATION.md)** - Detailed feature documentation
3. **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical architecture and component guide
4. **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - What was built and how it works
5. **[COMPLETION_REPORT.md](COMPLETION_REPORT.md)** - Final status and metrics

---

## 🎯 Key Features Explained

### Goals Tracker
```tsx
// Create a goal
- Title, description, target value
- Track progress with visual bar
- Mark as completed
- Delete when done

// Data persists in localStorage
```

### Habits Tracker
```tsx
// Create a habit
- Name, description, frequency
- Check off daily
- Watch streak grow
- Build better routines

// Streak counter auto-increments
```

### Dashboard Overview
```
- Active goals counter
- Completed goals count
- Total streak across habits
- Today's completed habits
- Top goals with progress
- All habits status
```

---

## 🌐 Deployment

### Deploy to Netlify (Recommended)

1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Select your GitHub repository
4. Netlify auto-detects build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click Deploy
6. Your app is live! 🎉

The repository includes `netlify.toml` configuration.

### Alternative: GitHub Pages

See [FEATURES_IMPLEMENTATION.md](FEATURES_IMPLEMENTATION.md) for GitHub Pages setup.

---

## 💻 Usage

### Login & Access Dashboard
```
1. Click "Get Started" on landing page
2. Sign up or login with Firebase
3. Verify email (if new user)
4. Automatically redirected to dashboard
5. Start tracking goals and habits!
```

### Toggle Dark Mode
```
- Click sun/moon icon in navbar
- Or click theme toggle in dashboard
- Preference saved automatically
```

### Create a Goal
```
1. Go to Goals tab
2. Click "+ Add Goal"
3. Fill in details
4. See progress bar
5. Update progress anytime
```

### Track a Habit
```
1. Go to Habits tab
2. Click "+ Add Habit"
3. Check off daily
4. Watch streak grow
5. Never break the chain!
```

---

## 🎨 Customization

### Change Colors
Edit Tailwind color classes in components:
```tsx
// Change primary gradient
className="bg-gradient-to-r from-purple-600 to-blue-600"

// Change theme colors
dark:bg-gray-900
```

### Update Branding
- Change app name in Navbar and DashboardLayout
- Replace logo with your image
- Update colors to match brand

### Add New Features
- Create components in `components/`
- Add types in `types/tracker.ts`
- Add new context providers as needed
- Update routing in `App.tsx`

---

## 🔒 Security

- ✅ Firebase Authentication
- ✅ Email verification required
- ✅ Protected routes (auth guards)
- ✅ Session management
- ✅ Secure logout
- ✅ localStorage for persistence

---

## 📊 Component Library

### Reusable Components

**Button**
```tsx
<Button variant="primary" size="lg">Click Me</Button>
<Button isLoading={loading}>Loading...</Button>
```

**Card**
```tsx
<Card hoverable>Content</Card>
```

**ProgressBar**
```tsx
<ProgressBar value={65} max={100} variant="success" />
```

**Toast**
```tsx
const { addToast } = useToast();
addToast('Success!', 'success');
```

**Theme**
```tsx
const { isDark, toggleTheme } = useTheme();
```

---

## 🚀 Performance

- ✅ Code splitting ready
- ✅ Optimized bundle size
- ✅ Efficient re-renders
- ✅ Hardware-accelerated animations
- ✅ Lazy loading support

---

## ♿ Accessibility

- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Color contrast (WCAG AA)
- ✅ Keyboard navigation
- ✅ Focus visible states

---

## 📱 Browser Support

- ✅ Chrome (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Edge (latest 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🤝 Contributing

This is a personal project, but feel free to fork and extend!

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🎓 What You Can Learn

- React hooks & Context API
- TypeScript best practices
- Tailwind CSS dark mode
- Component architecture
- State management
- Firebase integration
- Responsive design
- SaaS UI/UX patterns
- localStorage persistence

---

## 🆘 Support

For issues or questions:

1. Check the [documentation](./QUICK_START.md)
2. Review [FEATURES_IMPLEMENTATION.md](FEATURES_IMPLEMENTATION.md)
3. See [ARCHITECTURE.md](ARCHITECTURE.md) for technical details

---

## 🎯 Roadmap

### Coming Soon
- [ ] Cloud sync with Firestore
- [ ] Analytics dashboard
- [ ] Achievement badges
- [ ] Social features (sharing, accountability)
- [ ] Advanced analytics charts
- [ ] Habit reminders
- [ ] Goal templates

---

## 📞 Contact

- GitHub: [@VikramGanesh06](https://github.com/VikramGanesh06)
- Repository: https://github.com/VikramGanesh06/Ryzenflow

---

## ⭐ Show Your Support

If you find this project useful, please star it on GitHub! ⭐

---

## 🙏 Acknowledgments

Built with:
- React & TypeScript
- Tailwind CSS
- Firebase
- Lucide Icons
- Vite

---

**Ready to launch your premium SaaS app?** 🚀

Start tracking your goals and habits today!

---

*Last Updated: January 19, 2026*
*Status: Production Ready ✅*
