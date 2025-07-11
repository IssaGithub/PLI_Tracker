# 📊 KPI Tracker

A modern, mobile-first KPI (Key Performance Indicator) tracking application built with Astro.js and Tailwind CSS. Track, manage, and export your business metrics with ease.

## ✨ Features

### Core Functionality
- **📈 KPI Management**: Create, edit, and delete custom KPIs
- **🎯 Target Tracking**: Set targets and monitor progress with visual indicators
- **📊 Progress Visualization**: Beautiful progress bars and percentage tracking
- **📱 Mobile-First Design**: Fully responsive design that works on all devices
- **💾 Local Storage**: All data persists in your browser's local storage
- **📤 CSV Export**: Export individual KPI history or complete dashboard data

### KPI Customization
- **🏷️ Categories**: Organize KPIs into predefined categories (Financial, Marketing, Sales, Operations, Customer, HR, Product, Custom)
- **🎨 Color Coding**: Choose from 8 beautiful preset colors for visual organization
- **📝 Descriptions**: Add optional descriptions for better context
- **🔢 Units**: Flexible unit system (currency, percentages, counts, etc.)
- **📅 Historical Tracking**: Add timestamped entries to track KPI changes over time

### User Experience
- **⚡ Quick Updates**: Rapid value updates with one-click modal
- **🔍 Smart Organization**: Automatic grouping by categories
- **📊 Dashboard Overview**: Quick stats showing total KPIs, categories, targets, and achievements
- **🎉 Achievement Indicators**: Visual feedback when targets are exceeded
- **📱 Touch-Friendly**: Optimized for mobile and tablet interactions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Modern web browser with localStorage support

### Installation & Setup

1. **Clone the repository** (if not already done):
   ```bash
   git clone <your-repo-url>
   cd PLI_Tracker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:4321
   ```

## 📖 Usage Guide

### Creating Your First KPI

1. Click the **"🚀 Create Your First KPI"** or **"➕ Add KPI"** button
2. Fill in the KPI details:
   - **Name**: A descriptive name (e.g., "Monthly Revenue")
   - **Description**: Optional context about the KPI
   - **Current Value**: The starting value
   - **Target Value**: Optional goal to track progress
   - **Unit**: How the value is measured ($, %, users, etc.)
   - **Category**: Choose from predefined categories
   - **Color**: Select a color for visual identification
3. Click **"Create KPI"** to save

### Managing KPIs

#### Quick Update
- Click **"Quick Update"** on any KPI card
- Enter the new value and optional note
- The KPI will be updated and a historical entry will be created

#### Edit KPI
- Click the **⋮** menu on any KPI card
- Select **"✏️ Edit KPI"** to modify KPI settings

#### Delete KPI
- Click the **⋮** menu on any KPI card
- Select **"🗑️ Delete"** and confirm
- ⚠️ This will permanently remove the KPI and all its historical data

### Exporting Data

#### Export All Data
- Click **"📊 Export CSV"** in the dashboard header
- Downloads a comprehensive CSV with all KPIs and summary statistics

#### Export Individual KPI History
- Click the **⋮** menu on any KPI card
- Select **"📊 Export History"**
- Downloads a CSV file with all historical entries for that KPI

## 🛠️ Technical Architecture

### Technology Stack
- **Frontend Framework**: Astro.js 4.x
- **Styling**: Tailwind CSS 4.x
- **Language**: TypeScript
- **Build Tool**: Vite
- **Icons**: Heroicons (SVG)

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── KPICard.astro    # Individual KPI display card
│   ├── ClientDashboard.astro # Main dashboard with client-side functionality
│   └── KPIForm.astro    # KPI creation/editing form
├── layouts/
│   └── Layout.astro     # Main page layout template
├── pages/
│   └── index.astro      # Homepage/dashboard
├── styles/
│   └── global.css       # Global styles and Tailwind imports
├── types/
│   └── kpi.ts          # TypeScript type definitions
└── utils/
    ├── storage.ts       # Local storage management functions
    └── csv.ts          # CSV export utilities
```

### Data Architecture

#### KPI Data Structure
```typescript
interface KPI {
  id: string;
  name: string;
  description?: string;
  value: number;
  target?: number;
  unit: string;
  category: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Historical Entry Structure
```typescript
interface KPIEntry {
  id: string;
  kpiId: string;
  value: number;
  date: Date;
  note?: string;
}
```

### Storage Strategy
- **Primary Storage**: Browser localStorage
- **Storage Keys**: 
  - `kpi-tracker-kpis`: Main KPI definitions
  - `kpi-tracker-entries`: Historical value entries
- **Data Persistence**: Automatic on every change
- **Cross-Session**: Data persists across browser sessions

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Danger**: Red (#EF4444)
- **Purple**: (#8B5CF6)
- **Cyan**: (#06B6D4)
- **Orange**: (#F97316)
- **Lime**: (#84CC16)

### Typography
- **Font Family**: System UI font stack
- **Headings**: Semibold weights
- **Body Text**: Regular weight
- **Small Text**: Gray-600 color for secondary information

### Responsive Breakpoints
- **Mobile**: < 768px (single column layout)
- **Tablet**: 768px - 1024px (2-column grid)
- **Desktop**: > 1024px (3-column grid)

## 🔧 Development

### Available Scripts
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run astro check
```

### Adding New Features

#### New KPI Categories
1. Edit `src/types/kpi.ts`
2. Add to the `KPICategories` type and `KPI_CATEGORIES` array

#### New Color Options
1. Edit `src/types/kpi.ts`
2. Add hex color codes to the `KPI_COLORS` array

#### Custom Export Formats
1. Create new export functions in `src/utils/csv.ts`
2. Add corresponding UI elements in dashboard components

## 📱 Mobile Features

### Touch Interactions
- **Tap**: Quick actions and navigation
- **Long Press**: Context menus (where applicable)
- **Swipe**: Smooth scrolling and card interactions

### Mobile Optimizations
- **Touch Targets**: Minimum 44px touch targets
- **Font Sizes**: Responsive typography scaling
- **Layout**: Single-column layout on mobile devices
- **Menu**: Collapsible navigation on smaller screens

## 🔒 Privacy & Security

### Data Privacy
- **Local Storage Only**: No data sent to external servers
- **Browser-Specific**: Data is isolated to your browser
- **No Tracking**: No analytics or user tracking implemented
- **Export Control**: You control when and what data is exported

### Security Considerations
- **XSS Protection**: Input sanitization implemented
- **CSP Ready**: Compatible with Content Security Policy
- **No External Dependencies**: Minimal external resource loading

## 🚀 Deployment

### GitHub Pages (Automatic) - Recommended

The easiest way to deploy your KPI Tracker:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy KPI Tracker"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository **Settings** → **Pages**
   - Set Source to **GitHub Actions**
   - The included workflow will automatically deploy your app

3. **Access your app**:
   - Your KPI Tracker will be live at: `https://[username].github.io/[repository-name]/`

### Manual Deployment

For manual deployment to GitHub Pages:

```bash
# Install dependencies (one-time setup)
npm install

# Deploy with full logging and verification
npm run deploy

# Or simple deployment
npm run deploy:simple
```

### Build for Production
```bash
npm run build
```

### Other Deploy Options
- **Netlify**: Connect your GitHub repo, build command: `npm run build`, publish dir: `dist`
- **Vercel**: Import GitHub repo, automatic Astro detection
- **Cloudflare Pages**: Connect repo, build command: `npm run build`, output dir: `dist`

📖 **Detailed deployment guide**: See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for comprehensive instructions.

## 🤝 Contributing

### Code Style
- **ESLint**: Follow the configured linting rules
- **Prettier**: Use for code formatting
- **TypeScript**: Strict mode enabled
- **Comments**: Document complex functions and business logic

### Component Guidelines
- **Single Responsibility**: Each component should have one clear purpose
- **Props Interface**: Always define TypeScript interfaces for component props
- **Accessibility**: Include ARIA labels and semantic HTML
- **Mobile-First**: Design for mobile, enhance for desktop

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For questions, issues, or feature requests:
1. Check the GitHub issues for existing discussions
2. Create a new issue with detailed information
3. Include browser version and steps to reproduce any bugs

---

**Happy KPI Tracking! 📊✨**
