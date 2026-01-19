# Component Architecture & Structure

## Directory Tree

```
ryzenflow---premium-secure-workspace/
├── context/                          # Global state management
│   ├── ThemeContext.tsx             # Dark/Light mode context
│   └── ToastContext.tsx             # Toast notifications context
│
├── types/                            # TypeScript type definitions
│   ├── tracker.ts                   # Goal & Habit interfaces
│   └── (existing) types.ts
│
├── components/
│   ├── [Landing/Public Pages]
│   │   ├── Navbar.tsx               # Navigation bar (updated with ThemeToggle)
│   │   ├── Hero.tsx                 # Landing page hero section
│   │   ├── Logos.tsx                # Partner logos section
│   │   ├── Features.tsx             # Features section
│   │   ├── Product.tsx              # Product page
│   │   ├── Solutions.tsx            # Solutions page
│   │   ├── Pricing.tsx              # Pricing page
│   │   ├── Support.tsx              # Support page
│   │   ├── Footer.tsx               # Footer component
│   │   ├── CursorTrail.tsx          # Cursor animation effect
│   │
│   ├── [Authentication]
│   │   ├── AuthForm.tsx             # Login/Register form
│   │   ├── VerificationPending.tsx  # Email verification
│   │   └── Profile.tsx              # User profile page
│   │
│   ├── [Dashboard - Protected Routes]
│   │   ├── AppDashboard.tsx         # Main dashboard component
│   │   ├── DashboardLayout.tsx      # Dashboard layout with sidebar
│   │   ├── GoalsTracker.tsx         # Goals management component
│   │   └── HabitsTracker.tsx        # Habits management component
│   │
│   ├── [Reusable UI Components]
│   │   ├── Button.tsx               # Customizable button
│   │   ├── Card.tsx                 # Card wrapper component
│   │   ├── ProgressBar.tsx          # Progress visualization
│   │   ├── ThemeToggle.tsx          # Dark/Light mode toggle
│   │   ├── SkeletonLoader.tsx       # Loading placeholder
│   │   ├── ToastContainer.tsx       # Toast notifications display
│   │   │
│   │   ├── (existing) Dashboard.tsx
│   │
├── App.tsx                          # Main app router (updated)
├── index.tsx                        # React entry point
├── firebase.ts                      # Firebase config
├── index.html                       # HTML entry point
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript config
├── package.json                    # Dependencies
└── public/assets/                  # Static assets
    └── ryzenflow-logo.svg
```

---

## Component Hierarchy

```
App.tsx (Root)
│
├── [Unauthenticated]
│   ├── Navbar
│   ├── Hero
│   ├── Logos
│   ├── Features (implicit)
│   └── Footer
│
├── AuthForm (Modal overlay)
│
└── [Authenticated]
    ├── AppDashboard
    │   └── DashboardLayout
    │       ├── Sidebar Navigation
    │       │   ├── Overview (selected)
    │       │   ├── Goals (selected)
    │       │   └── Habits (selected)
    │       │
    │       └── Main Content
    │           ├── [Overview Tab] (default)
    │           │   ├── Stats Cards
    │           │   │   ├── Active Goals Card
    │           │   │   ├── Completed Goals Card
    │           │   │   ├── Total Streak Card
    │           │   │   └── Today's Habits Card
    │           │   ├── Top Goals Section
    │           │   │   └── Multiple Goal Cards with ProgressBar
    │           │   └── Daily Habits Status
    │           │       └── Multiple Habit Status Cards
    │           │
    │           ├── [Goals Tab]
    │           │   └── GoalsTracker
    │           │       ├── Goal Creation Form
    │           │       └── Goals List
    │           │           └── Multiple Goal Cards
    │           │
    │           └── [Habits Tab]
    │               └── HabitsTracker
    │                   ├── Habit Creation Form
    │                   └── Habits List
    │                       └── Multiple Habit Cards
    │
    └── ToastContainer (floating notifications)
```

---

## Component Specifications

### 1. **ThemeToggle** 
- **Props:** None
- **State:** Uses `useTheme()` hook
- **Features:** 
  - Sun/Moon icon animation
  - Smooth rotation
  - Automatic persistence

### 2. **Button**
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  isLoading?: boolean
  disabled?: boolean
}
```

### 3. **Card**
```tsx
interface CardProps {
  children: React.ReactNode
  className?: string
  hoverable?: boolean
}
```

### 4. **ProgressBar**
```tsx
interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showPercentage?: boolean
  variant?: 'primary' | 'success' | 'warning' | 'danger'
}
```

### 5. **GoalsTracker**
```tsx
interface GoalsTrackerProps {
  goals?: Goal[]
  onAddGoal?: (goal: Omit<Goal, 'id' | 'createdAt'>) => void
  onUpdateGoal?: (goal: Goal) => void
  onDeleteGoal?: (id: string) => void
}
```

### 6. **HabitsTracker**
```tsx
interface HabitsTrackerProps {
  habits?: Habit[]
  onAddHabit?: (habit: Omit<Habit, 'id' | 'createdAt' | 'completions' | 'lastCompleted'>) => void
  onToggleHabit?: (id: string, date: string) => void
  onDeleteHabit?: (id: string) => void
}
```

### 7. **DashboardLayout**
```tsx
interface DashboardLayoutProps {
  children: React.ReactNode
  currentTab: 'overview' | 'goals' | 'habits'
  onTabChange: (tab: 'overview' | 'goals' | 'habits') => void
  onLogout: () => void
  userName?: string
}
```

### 8. **AppDashboard**
```tsx
interface AppDashboardProps {
  user?: { email?: string; displayName?: string }
  onLogout: () => void
}
```

---

## Data Flow

### Goal Management
```
User Input (Form)
    ↓
handleAddGoal()
    ↓
setGoals([...goals, newGoal])
    ↓
useEffect saves to localStorage
    ↓
GoalsTracker re-renders with new goal
    ↓
Progress bar updates automatically
```

### Habit Tracking
```
User clicks ✓ (Complete today)
    ↓
handleToggleHabit(id, today)
    ↓
Update completions[today] & increment streak
    ↓
setHabits with updated habit
    ↓
useEffect saves to localStorage
    ↓
Toast notification shows
    ↓
HabitsTracker re-renders
```

### Theme Change
```
User clicks theme toggle
    ↓
toggleTheme() in ThemeContext
    ↓
isDark state inverts
    ↓
localStorage.setItem('theme', isDark ? 'dark' : 'light')
    ↓
Entire app re-renders with new classes
    ↓
Smooth transition animation
```

---

## Styling System

### Color Palette
```
Primary:    Purple → Blue (gradient)
Success:    Green → Emerald
Warning:    Yellow → Orange
Danger:     Red → Pink

Light Mode: White backgrounds, dark text
Dark Mode:  Gray-900 backgrounds, white text
```

### Spacing Scale
```
xs: 0.25rem  (4px)
sm: 0.5rem   (8px)
md: 1rem     (16px)
lg: 1.5rem   (24px)
xl: 2rem     (32px)
2xl: 3rem    (48px)
```

### Typography
```
Display:  text-3xl - text-5xl (headings)
Large:    text-xl - text-2xl (section titles)
Base:     text-base - text-lg (body text)
Small:    text-sm (labels, captions)
Tiny:     text-xs (metadata)
```

---

## Performance Optimizations

1. **Code Splitting**
   - Dynamic imports for route pages
   - Lazy load images

2. **State Management**
   - useContext for global state
   - Local state for component-specific data
   - No unnecessary re-renders

3. **Animations**
   - Hardware-accelerated transitions
   - CSS-based animations (not JS)
   - Minimal DOM manipulation

4. **Bundle Size**
   - Tailwind CSS (utility-first)
   - Minimal dependencies
   - Tree-shaking enabled

---

## Testing Strategy

### Component Tests
```tsx
// Example test structure
describe('Button', () => {
  it('should render primary variant', () => { ... })
  it('should show loading state', () => { ... })
  it('should handle click', () => { ... })
})
```

### Integration Tests
```tsx
// Example integration test
describe('GoalsTracker', () => {
  it('should create and display goal', () => { ... })
  it('should update progress', () => { ... })
  it('should delete goal', () => { ... })
})
```

### E2E Tests
```
Feature: Goal Management
  Scenario: User creates and completes goal
    Given user is logged in
    When user creates a goal "Learn React"
    Then goal appears in list
    And progress bar shows 0%
    When user updates progress to 50%
    Then progress bar updates
    And toast shows success message
```

---

## Browser Support

✅ **Modern Browsers**
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

✅ **Features Used**
- CSS Grid & Flexbox
- CSS Custom Properties
- ES2020+ JavaScript
- LocalStorage API
- Fetch API

---

## Accessibility (a11y)

✅ **Implemented**
- Semantic HTML
- ARIA labels on buttons
- Color contrast (WCAG AA)
- Keyboard navigation support
- Focus visible states
- Alt text on images
- Form labels associated with inputs

---

## Mobile Responsiveness

```
Mobile (<768px)
- Single column layout
- Hamburger menu
- Touch-friendly spacing
- Stacked cards

Tablet (768px-1024px)
- 2-column grid
- Collapsible sidebar
- Medium spacing

Desktop (>1024px)
- Multi-column layout
- Full sidebar
- Maximum width 1400px
```

---

## Future Extensibility

### Adding New Features
1. Create component in `components/`
2. Add types in `types/tracker.ts` if needed
3. Add context in `context/` if global state needed
4. Import and use in App.tsx or dashboard

### Creating New Pages
1. Create component in `components/`
2. Add route hash in App.tsx
3. Add navigation button
4. Style with Tailwind

### Adding New Context
1. Create file in `context/`
2. Export provider and hook
3. Wrap App.tsx with provider
4. Use hook in components

---

## Deployment Checklist

- [ ] All components render correctly
- [ ] Dark mode works on all pages
- [ ] localStorage persists data
- [ ] Firebase auth works
- [ ] Responsive on mobile/tablet/desktop
- [ ] All toast notifications display
- [ ] Animations are smooth
- [ ] No console errors
- [ ] Performance is acceptable
- [ ] SEO metadata is set

---

*This architecture is built for scalability, maintainability, and performance.*
*Ready for production deployment!*
