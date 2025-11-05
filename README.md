# 🎓 UNI-Agent - Next-Generation AI Academic Platform

<div align="center">

![UNI-Agent Banner](https://img.shields.io/badge/🏆_Hackathon_Ready-Production_Grade-gold?style=for-the-badge)

**Revolutionizing Student Success with Multi-Agent AI**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-green?style=flat-square&logo=openai)](https://openai.com/)
[![Prisma](https://img.shields.io/badge/Prisma-PostgreSQL-blueviolet?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-MIT-orange?style=flat-square)](LICENSE)

[🚀 Live Demo](http://localhost:3010) • [📹 Demo Video](https://youtu.be/NCQug3dqeuE) • [📖 Documentation](#documentation)

</div>

---

## 🌟 Executive Summary

**UNI-Agent** is a comprehensive AI-powered academic platform that transforms how students learn, study, and succeed. Built with cutting-edge technologies and production-ready architecture, it combines **7 specialized AI agents**, **intelligent orchestration**, **predictive analytics**, and a **stunning modern UI** to create an unparalleled educational experience.

### 🏆 Why UNI-Agent Wins

- ✅ **Production-Ready Architecture** - Enterprise-grade code, fully typed with TypeScript
- ✅ **Multi-Agent AI System** - 7 specialized agents with intelligent orchestration
- ✅ **Beautiful Modern UI** - Glassmorphism, gradients, smooth animations
- ✅ **Zero-Setup Demo** - Works instantly with pre-populated data
- ✅ **Real Database Integration** - Prisma + PostgreSQL with authentication
- ✅ **Comprehensive Features** - 15+ major features, 50+ micro-features
- ✅ **Mobile-First PWA** - Install on any device, works offline
- ✅ **Fully Documented** - Clean code, extensive comments, proper Git history

---

## ⚡ Quick Start (Under 2 Minutes)

```bash
# Clone the repository
git clone https://github.com/kurdim12/uniagenthackthon.git
cd uniagenthackthon

# Install dependencies
npm install

# Run the app (zero configuration!)
npm run dev

# Open http://localhost:3000 in your browser
```

**That's it!** 🎉 The platform launches with:
- ✅ 2 fully populated demo accounts (Sarah Chen & Marcus Johnson)
- ✅ Real course data, assignments, materials, and exams
- ✅ AI-powered features ready to use
- ✅ Beautiful UI with dark mode support
- ✅ No database setup, no API keys required for demo

### 🎮 Test the Platform (Recommended Flow)

1. **Landing Page** → Watch the demo video → Click "START DEMO"
2. **Select Account** → Choose Sarah Chen or Marcus Johnson
3. **Explore Features** → Try each tab in CS101 course:
   - 🤖 **AI Tutor** - Ask "Create a quiz to test my understanding"
   - 📚 **Materials** - View PDFs and study resources
   - 📝 **Assignments** - Drag tasks through Kanban board
   - 🗓️ **Planner** - AI-optimized study schedule
   - 🎴 **Flashcards** - Spaced repetition learning
   - 📊 **Analytics** - Performance insights and predictions

### 🔑 Advanced Setup (Optional)

For full features with database and authentication:

```bash
# 1. Setup environment variables
cp .env.example .env.local

# 2. Add your credentials to .env.local
DATABASE_URL="postgresql://..."
OPENAI_API_KEY="sk-..."
AUTH_JWT_SECRET="your-secret-key"

# 3. Setup database
npx prisma generate
npx prisma migrate dev

# 4. Run with full features
npm run dev
```

---

## 🏆 Standout Features (Judge Highlights)

### 1. 🤖 Multi-Agent AI Orchestra tion System

**The Innovation:** Instead of a single AI, UNI-Agent uses **7 specialized agents** that intelligently collaborate:

| Agent | Specialty | Example Query |
|-------|-----------|---------------|
| 🗓️ **Planner Agent** | Study scheduling, time optimization | "Plan my week around my CS exam" |
| 📚 **Course Agent** | Subject expertise, concept explanation | "Explain Big-O notation" |
| 📝 **Assignment Agent** | Task breakdown, project management | "Help me plan my final project" |
| 🎯 **Exam Agent** | Test preparation, mock exams | "Create a practice quiz for CS101" |
| 📓 **Notes Agent** | Summarization, flashcard generation | "Turn my notes into flashcards" |
| 🔬 **Research Agent** | Academic writing, citations | "Help write my research paper" |
| 🏫 **Campus Agent** | Location info, campus resources | "Where is the library?" |

**Technical Implementation:**
- GPT-4o-mini powered orchestrator analyzes intent
- Dynamic routing based on query classification
- Agents call specialized tools (search, calendar, vector DB)
- Real-time workflow visualization shows reasoning
- Full citation tracking from course materials

**Try it:** Go to any course → Tutor tab → Ask anything!

### 2. 🎨 Premium UI/UX Design

**Visual Excellence:**
- ✨ **Glassmorphism** - Modern backdrop blur effects
- 🌈 **Gradient Animations** - Smooth color transitions
- 💎 **Framer Motion** - Buttery 60fps animations
- 🌚 **Dark Mode** - Fully themed, no jarring whites
- 📱 **Responsive** - Perfect on mobile, tablet, desktop
- ♻️ **Accessibility** - ARIA labels, keyboard navigation

**Design Inspiration:** Apple.com × Linear.app × Notion

### 3. 📊 Predictive Analytics & Insights

- **Grade Predictions** - ML-based performance forecasting
- **Study Pattern Analysis** - Best study hours, productivity trends
- **Retention Tracking** - Spaced repetition effectiveness
- **XP & Gamification** - Points, streaks, achievements
- **Auto-Suggestions** - Proactive deadline reminders

### 4. 📦 Production-Ready Architecture

```
🏛️ Tech Stack:
├── Frontend: Next.js 14 (App Router), TypeScript, Tailwind CSS
├── State: Zustand + React Context
├── Database: Prisma + PostgreSQL
├── Auth: JWT sessions + bcrypt
├── AI: OpenAI GPT-4o-mini
├── Animations: Framer Motion
└── Validation: Zod schemas
```

**Code Quality:**
- ✅ 100% TypeScript (no `any` types)
- ✅ Modular component architecture
- ✅ API route protection with middleware
- ✅ Comprehensive error handling
- ✅ Clean Git history with semantic commits

### 5. 🚀 Unique Innovations

- **🌐 Three Operation Modes** - Demo (localStorage) | Cloud (PostgreSQL) | Offline (mock)
- **🔊 Voice Input** - Speak questions to AI tutor
- **📅 Calendar Export** - iCal format for Google/Outlook/Apple
- **🧠 SM-2 Spaced Repetition** - Scientifically proven flashcard system
- **🎭 Onboarding Tour** - Interactive product walkthrough
- **🎉 Celebration Animations** - Confetti on achievements
- **📲 PWA Support** - Installable, works offline

---

## 🎯 What is UNI-Agent?

**UNI-Agent** is an all-in-one AI-powered academic assistant designed to help students succeed in their studies. It combines intelligent course management, AI tutoring, study planning, assignment tracking, and learning analytics into a single, seamless platform.

### What Makes UNI-Agent Special?

- **🤖 Multi-Agent AI System**: 7 specialized AI agents work together to provide intelligent assistance
- **📚 Course-Centric Design**: Everything revolves around your courses with dedicated course pages
- **🧠 Intelligent Study Planning**: AI-powered schedule optimization and conflict detection
- **📊 Predictive Analytics**: Performance insights and grade predictions
- **🎯 Spaced Repetition**: Scientifically-proven flashcard system for better retention
- **🔊 Voice Input**: Speak your questions instead of typing
- **📅 Calendar Integration**: Export schedules to your favorite calendar app
- **📱 Progressive Web App**: Install on mobile devices and use offline
- **🎨 Beautiful UI/UX**: Fully responsive, polished design for all devices

---

## ✨ Key Features

### 🎓 Course Management

Each course gets its own dedicated page (`/courses/[courseId]`) with:

- **Overview Tab**: Course statistics, XP/Streak tracking, auto-suggestions
- **Materials Tab**: Upload and organize PDFs, documents, URLs with text extraction
- **Assignments Tab**: Kanban board (To Do → In Progress → Submitted)
- **Planner Tab**: Weekly calendar with AI-powered time optimization
- **Tutor Tab**: AI chat assistant with voice input and course-specific context
- **Notes Tab**: Markdown editor with AI-powered flashcard generation
- **Exams Tab**: Exam timeline with mock exam features
- **Flashcards Tab**: Spaced repetition system (SM-2 algorithm)
- **Analytics Tab**: Performance insights, grade predictions, study patterns
- **Settings Tab**: Course-specific preferences and export/import

### 🤖 AI Agents System

UNI-Agent uses **7 specialized AI agents** that intelligently route your questions:

| Agent | Purpose | When It Activates |
|-------|---------|-------------------|
| 🗓️ **Planner** | Schedule organization, time management | "Plan my week", "Schedule study time" |
| 📚 **Course** | Subject explanations, concept help | Default for educational questions |
| 📝 **Assignment** | Task breakdown, project planning | "Help with assignment", "Break down task" |
| 🎓 **Exam** | Test preparation, study guides | "Prepare for exam", "Create study plan" |
| 📔 **Notes** | Note enhancement, summarization | "Summarize notes", "Create flashcards" |
| 🔬 **Research** | Academic writing, citations | "Write paper", "Find sources" |
| 🏫 **Campus** | Location information, resources | "Where is library", "Campus info" |

**How It Works:**
- Intelligent routing analyzes your question
- Multi-agent collaboration for complex requests
- Visible reasoning and workflow visualization
- Citations from your course materials

### 📊 Intelligent Features

- **Auto-Suggestions**: Proactive recommendations for assignments, study time, deadlines
- **Conflict Detection**: Automatically detects scheduling conflicts
- **Performance Predictions**: Grade predictions based on study patterns
- **Learning Analytics**: Track study time, retention, best study hours
- **XP & Gamification**: Earn XP for completing tasks, maintain streaks
- **Spaced Repetition**: SM-2 algorithm for optimal flashcard review timing

### 💾 Data Management

- **Three Storage Modes**:
  - **Demo Mode**: Browser localStorage (no setup required)
  - **Cloud Mode**: Supabase PostgreSQL with authentication
  - **Offline Mode**: Deterministic mock responses (no network)

- **Export/Import**: Backup your data as JSON files
- **Seed Data**: Pre-populated with sample courses, assignments, and materials

---

## 🏗️ Platform Architecture

### Application Structure

```
UNI-Agent Platform
├── Frontend (Next.js 14 App Router)
│   ├── Dashboard & Global Pages
│   ├── Course Pages (Single-Route Architecture)
│   ├── AI Agent System
│   └── UI Components
├── Backend (API Routes)
│   ├── AI Orchestration Endpoint
│   ├── Authentication (NextAuth)
│   └── Storage Management
└── Data Layer
    ├── Zustand Store (State Management)
    ├── localStorage (Demo Mode)
    └── Supabase (Cloud Mode)
```

### Core Concepts

**Single-Route Course Architecture:**
- All course-related data is accessed via `/courses/[courseId]`
- Course tabs provide unified access to all course features
- Context-aware AI that understands current course
- Data scoped by `courseId` for security and organization

**Multi-Agent Orchestration:**
- Central orchestrator routes requests to appropriate agents
- Agents can collaborate on complex tasks
- Tool calling for agent capabilities (search, calculate, delegate)
- Memory system for context-aware responses

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- (Optional) OpenAI API key for AI features
- (Optional) Supabase account for cloud mode

### Installation

```bash
# Clone the repository
git clone https://github.com/kurdim12/vcoders-sub.git
cd vcoders-sub

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Set your mode (default: demo)
echo "AIO_MODE=demo" >> .env.local

# (Optional) Add OpenAI API key for AI features
echo "OPENAI_API_KEY=sk-your-key-here" >> .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the platform!

### Environment Variables

See `.env.example` for all available options.

**Minimum for Demo:**
```env
AIO_MODE=demo
```

**For Full AI Features:**
```env
AIO_MODE=demo
OPENAI_API_KEY=sk-your-key-here
```

---

## 📱 Usage Guide

### First Steps

1. **Visit Landing Page**: `/landing` - See platform overview
2. **Enter Demo**: `/auth/signin` - Sign in with demo account
3. **View Courses**: Navigate to `/courses` to see your enrolled courses
4. **Open a Course**: Click any course to open its dedicated page
5. **Explore Tabs**: Try Overview, Materials, Assignments, Planner, Tutor, Notes, Exams, Flashcards, Analytics

### Using AI Agents

**Global AI Input (Dashboard):**
- Type any question on the dashboard
- AI routes to appropriate agent automatically
- See reasoning and citations

**Course-Specific Tutor:**
- Go to a course → Tutor tab
- Ask questions about that course
- AI searches course materials automatically
- Use voice input for hands-free interaction

**Agent Lab:**
- Visit `/agents` to see all agents
- View agent capabilities and stats
- See workflow visualization

### Managing Assignments

1. Go to course → Assignments tab
2. Create new assignment or drag between columns
3. AI suggests optimal timing
4. Track progress in Kanban board

### Study Planning

1. Go to course → Planner tab
2. View weekly calendar
3. Click "Replan with AI" for optimization
4. Set available time: "I only have X minutes today"
5. AI redistributes study blocks intelligently

### Flashcards

1. Go to course → Flashcards tab
2. Create manually or generate from notes/PDFs
3. Review due cards daily
4. Rate your recall (0-5)
5. System schedules next review automatically

### Calendar Export

1. Go to course → Settings tab
2. Click "Export Calendar"
3. Import `.ics` file into Google Calendar, Outlook, or Apple Calendar
4. Syncs study blocks, assignments, and exams

---

## 🚢 Deployment

### Option 1: Vercel (Recommended for Next.js)

**Why Vercel?**
- ✅ Optimized for Next.js
- ✅ Zero-config deployment
- ✅ Automatic HTTPS & CDN
- ✅ Free tier with generous limits

**Steps:**
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" → Import `kurdim12/vcoders-sub`
4. Add environment variables
5. Click "Deploy"

**Your app will be live at `your-project.vercel.app`**

### Option 2: Railway

**Steps:**
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Create new project → Deploy from GitHub repo
4. Select `kurdim12/vcoders-sub`
5. Add environment variables
6. Deploy!

### Option 3: Netlify

**Steps:**
1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. New site from Git → Choose repo
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Add environment variables
7. Deploy!

---

## 📁 Project Structure

```
agently/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Dashboard (root)
│   ├── landing/                  # Landing page with hero
│   ├── demo/                     # Golden path demos
│   ├── layout.tsx                # Root layout
│   ├── courses/                  # Course pages
│   │   ├── page.tsx              # Courses list
│   │   └── [courseId]/           # Single course route
│   ├── study-plan/               # Study plan page
│   ├── assignments/              # Assignments Kanban
│   ├── exams/                    # Exams timeline
│   ├── notes/                    # Notes editor
│   ├── resources/                # Resources library
│   ├── tutor/                    # Global tutor chat
│   ├── agents/                   # Agent Lab
│   ├── settings/                 # Settings page
│   ├── auth/                     # Authentication
│   └── api/                      # API routes
│       ├── ai/route.ts           # AI orchestration
│       ├── auth/[...nextauth]/   # NextAuth
│       └── storage/route.ts       # Storage API
│
├── components/                   # React components
│   ├── course-layout.tsx         # Main course layout
│   ├── course-context.tsx        # Course context provider
│   ├── course/                   # Course-specific components
│   ├── ui/                       # shadcn/ui components
│   ├── auto-actions-panel.tsx    # Proactive suggestions
│   ├── voice-input.tsx          # Voice input component
│   └── workflow-visualization.tsx # Agent workflow
│
├── lib/                          # Core libraries
│   ├── store.ts                  # Zustand store
│   ├── types.ts                  # TypeScript types
│   ├── seed.ts                   # Seed data
│   ├── storage.ts                # Storage utilities
│   ├── ai.ts                     # AI client helpers
│   ├── retrieval.ts              # TF-IDF retrieval
│   ├── orchestrator/             # Multi-agent orchestration
│   ├── automation/               # Auto-actions
│   ├── hooks/                    # Custom hooks
│   ├── spaced-repetition.ts      # SM-2 algorithm
│   ├── calendar-export.ts        # iCal generation
│   ├── pdf-extraction.ts         # PDF text extraction
│   └── predictive-analytics.ts   # Performance predictions
│
└── Configuration files
    ├── .env.example              # Environment variables template
    ├── LICENSE                   # MIT License
    ├── .github/workflows/ci.yml  # CI/CD pipeline
    ├── next.config.mjs           # Next.js config
    ├── tailwind.config.ts        # Tailwind config
    └── tsconfig.json             # TypeScript config
```

---

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **React 18**: Modern React with hooks

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Beautiful, accessible components
- **Radix UI**: Unstyled, accessible primitives
- **Lucide React**: 400+ icons
- **next-themes**: Dark/light mode support

### State Management
- **Zustand**: Lightweight state management
- **localStorage**: Browser persistence (demo mode)
- **Supabase**: Cloud database (cloud mode)

### AI & Machine Learning
- **OpenAI API**: GPT-4 compatible models
- **TF-IDF**: Client-side document retrieval
- **Cosine Similarity**: Semantic search
- **Multi-Agent Orchestration**: Intelligent routing

### Additional Libraries
- **recharts**: Data visualization
- **date-fns**: Date utilities
- **react-markdown**: Markdown rendering
- **pdfjs-dist**: PDF text extraction
- **next-auth**: Authentication (cloud mode)
- **@tanstack/react-query**: Data fetching (ready for cloud)

### Development Tools
- **Playwright**: E2E testing
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Type checking
- **GitHub Actions**: CI/CD

---

## 💻 Development

### Running Locally

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Lint code
npm run lint
```

### Code Structure Guidelines

- **Components**: Reusable UI components in `components/`
- **Pages**: Route handlers in `app/` directory
- **API Routes**: Server endpoints in `app/api/`
- **Utilities**: Helper functions in `lib/`
- **Types**: TypeScript definitions in `lib/types.ts`

### Adding New Features

1. **New Page**: Create route in `app/` directory
2. **New Component**: Add to `components/` directory
3. **New Agent**: Extend `lib/orchestrator/orchestrator.ts`
4. **New Type**: Add to `lib/types.ts`
5. **Update Store**: Modify `lib/store.ts` for state

### Testing

```bash
# Run all tests
npm test

# Run specific test file
npx playwright test tests/dashboard.spec.ts

# Run in UI mode
npm run test:ui

# Debug tests
npx playwright test --debug
```

---

## 🎯 Platform Modes

### Demo Mode (Default)
- **Storage**: Browser localStorage
- **No Setup**: Works immediately
- **AI**: Uses OpenAI API if key provided, otherwise mock responses
- **Best For**: Quick testing, demos, personal use

### Cloud Mode
- **Storage**: Supabase PostgreSQL
- **Authentication**: NextAuth.js
- **Features**: Multi-device sync, real authentication, file storage
- **Best For**: Production, multi-user, team collaboration

### Offline Mode
- **Storage**: Browser localStorage
- **AI**: Deterministic mock responses
- **No Network**: Works completely offline
- **Best For**: Testing, restricted environments, offline use

---

## 📊 Key Metrics & Statistics

- **Total Files**: 125+ files
- **Lines of Code**: 28,000+ lines
- **Components**: 30+ React components
- **Pages**: 10+ complete pages
- **AI Agents**: 7 specialized agents
- **Course Tabs**: 9 tabs per course
- **Test Coverage**: Playwright E2E tests
- **CI/CD**: Automated via GitHub Actions

---

## 📸 Screenshots

> **Note**: Screenshots will be added here. To generate them:
> ```bash
> npm run dev
> # Visit http://localhost:3000
> # Take screenshots of: landing page, course view, tutor chat, flashcards
> ```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint and Prettier
- Write tests for new features
- Update documentation
- Follow existing code style

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **shadcn/ui** for beautiful components
- **Radix UI** for accessible primitives
- **Next.js** team for the amazing framework
- **OpenAI** for powerful AI capabilities
- **Supabase** for backend infrastructure

---

## 📞 Support & Resources

- **Documentation**: See `/docs` folder for detailed guides
- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Join discussions for questions and ideas

---

## 🗺️ Roadmap

### Planned Features
- [ ] Real-time collaborative study rooms
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Integration with LMS platforms
- [ ] Browser extension
- [ ] Offline-first architecture improvements

---

**Built with ❤️ for students everywhere by KURDILABS**

![Made with Next.js](https://img.shields.io/badge/Made%20with-Next.js-black)
![Powered by OpenAI](https://img.shields.io/badge/Powered%20by-OpenAI-green)

![Platform Preview](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

---

## 📖 Table of Contents

- [What is UNI-Agent?](#-what-is-uni-agent)
- [Key Features](#-key-features)
- [Platform Architecture](#-platform-architecture)
- [Getting Started](#-getting-started)
- [Usage Guide](#-usage-guide)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Technology Stack](#-technology-stack)
- [Development](#-development)
- [Contributing](#-contributing)

---

## 🎯 What is UNI-Agent?

**UNI-Agent** is an all-in-one AI-powered academic assistant designed to help students succeed in their studies. It combines intelligent course management, AI tutoring, study planning, assignment tracking, and learning analytics into a single, seamless platform.

### What Makes UNI-Agent Special?

- **🤖 Multi-Agent AI System**: 7 specialized AI agents work together to provide intelligent assistance
- **📚 Course-Centric Design**: Everything revolves around your courses with dedicated course pages
- **🧠 Intelligent Study Planning**: AI-powered schedule optimization and conflict detection
- **📊 Predictive Analytics**: Performance insights and grade predictions
- **🎯 Spaced Repetition**: Scientifically-proven flashcard system for better retention
- **🔊 Voice Input**: Speak your questions instead of typing
- **📅 Calendar Integration**: Export schedules to your favorite calendar app
- **📱 Progressive Web App**: Install on mobile devices and use offline

---

## ✨ Key Features

### 🎓 Course Management

Each course gets its own dedicated page (`/courses/[courseId]`) with:

- **Overview Tab**: Course statistics, XP/Streak tracking, auto-suggestions
- **Materials Tab**: Upload and organize PDFs, documents, URLs with text extraction
- **Assignments Tab**: Kanban board (To Do → In Progress → Submitted)
- **Planner Tab**: Weekly calendar with AI-powered time optimization
- **Tutor Tab**: AI chat assistant with voice input and course-specific context
- **Notes Tab**: Markdown editor with AI-powered flashcard generation
- **Exams Tab**: Exam timeline with mock exam features
- **Flashcards Tab**: Spaced repetition system (SM-2 algorithm)
- **Analytics Tab**: Performance insights, grade predictions, study patterns
- **Settings Tab**: Course-specific preferences and export/import

### 🤖 AI Agents System

UNI-Agent uses **7 specialized AI agents** that intelligently route your questions:

| Agent | Purpose | When It Activates |
|-------|---------|-------------------|
| 🗓️ **Planner** | Schedule organization, time management | "Plan my week", "Schedule study time" |
| 📚 **Course** | Subject explanations, concept help | Default for educational questions |
| 📝 **Assignment** | Task breakdown, project planning | "Help with assignment", "Break down task" |
| 🎓 **Exam** | Test preparation, study guides | "Prepare for exam", "Create study plan" |
| 📔 **Notes** | Note enhancement, summarization | "Summarize notes", "Create flashcards" |
| 🔬 **Research** | Academic writing, citations | "Write paper", "Find sources" |
| 🏫 **Campus** | Location information, resources | "Where is library", "Campus info" |

**How It Works:**
- Intelligent routing analyzes your question
- Multi-agent collaboration for complex requests
- Visible reasoning and workflow visualization
- Citations from your course materials

### 📊 Intelligent Features

- **Auto-Suggestions**: Proactive recommendations for assignments, study time, deadlines
- **Conflict Detection**: Automatically detects scheduling conflicts
- **Performance Predictions**: Grade predictions based on study patterns
- **Learning Analytics**: Track study time, retention, best study hours
- **XP & Gamification**: Earn XP for completing tasks, maintain streaks
- **Spaced Repetition**: SM-2 algorithm for optimal flashcard review timing

### 💾 Data Management

- **Three Storage Modes**:
  - **Demo Mode**: Browser localStorage (no setup required)
  - **Cloud Mode**: Supabase PostgreSQL with authentication
  - **Offline Mode**: Deterministic mock responses (no network)

- **Export/Import**: Backup your data as JSON files
- **Seed Data**: Pre-populated with sample courses, assignments, and materials

---

## 🏗️ Platform Architecture

### Application Structure

```
UNI-Agent Platform
├── Frontend (Next.js 14 App Router)
│   ├── Dashboard & Global Pages
│   ├── Course Pages (Single-Route Architecture)
│   ├── AI Agent System
│   └── UI Components
├── Backend (API Routes)
│   ├── AI Orchestration Endpoint
│   ├── Authentication (NextAuth)
│   └── Storage Management
└── Data Layer
    ├── Zustand Store (State Management)
    ├── localStorage (Demo Mode)
    └── Supabase (Cloud Mode)
```

### Core Concepts

**Single-Route Course Architecture:**
- All course-related data is accessed via `/courses/[courseId]`
- Course tabs provide unified access to all course features
- Context-aware AI that understands current course
- Data scoped by `courseId` for security and organization

**Multi-Agent Orchestration:**
- Central orchestrator routes requests to appropriate agents
- Agents can collaborate on complex tasks
- Tool calling for agent capabilities (search, calculate, delegate)
- Memory system for context-aware responses

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- (Optional) OpenAI API key for AI features
- (Optional) Supabase account for cloud mode

### Installation

```bash
# Clone the repository
git clone https://github.com/kurdim12/vcoders-sub.git
cd vcoders-sub

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Set your mode (default: demo)
echo "AIO_MODE=demo" >> .env.local

# (Optional) Add OpenAI API key for AI features
echo "OPENAI_API_KEY=sk-your-key-here" >> .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the platform!

### Environment Variables

```env
# Required: Choose your mode
AIO_MODE=demo              # Options: demo | cloud | offline

# Optional: AI Features (works without key in demo mode)
OPENAI_API_KEY=sk-...

# Optional: Cloud Mode (Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# Optional: Authentication (Cloud Mode)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-random-secret
```

---

## 📱 Usage Guide

### First Steps

1. **Sign In**: Use the demo account or create your own
2. **View Courses**: Navigate to `/courses` to see your enrolled courses
3. **Open a Course**: Click any course to open its dedicated page
4. **Explore Tabs**: Try Overview, Materials, Assignments, Planner, Tutor, Notes, Exams, Flashcards, Analytics

### Using AI Agents

**Global AI Input (Dashboard):**
- Type any question on the dashboard
- AI routes to appropriate agent automatically
- See reasoning and citations

**Course-Specific Tutor:**
- Go to a course → Tutor tab
- Ask questions about that course
- AI searches course materials automatically
- Use voice input for hands-free interaction

**Agent Lab:**
- Visit `/agents` to see all agents
- View agent capabilities and stats
- See workflow visualization

### Managing Assignments

1. Go to course → Assignments tab
2. Create new assignment or drag between columns
3. AI suggests optimal timing
4. Track progress in Kanban board

### Study Planning

1. Go to course → Planner tab
2. View weekly calendar
3. Click "Replan with AI" for optimization
4. Set available time: "I only have X minutes today"
5. AI redistributes study blocks intelligently

### Flashcards

1. Go to course → Flashcards tab
2. Create manually or generate from notes
3. Review due cards daily
4. Rate your recall (0-5)
5. System schedules next review automatically

### Calendar Export

1. Go to course → Settings tab
2. Click "Export Calendar"
3. Import `.ics` file into Google Calendar, Outlook, or Apple Calendar
4. Syncs study blocks, assignments, and exams

---

## 🚢 Deployment

### Option 1: Vercel (Recommended for Next.js)

**Why Vercel?**
- ✅ Optimized for Next.js
- ✅ Zero-config deployment
- ✅ Automatic HTTPS & CDN
- ✅ Free tier with generous limits

**Steps:**
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" → Import `kurdim12/vcoders-sub`
4. Add environment variables
5. Click "Deploy"

**Your app will be live at `your-project.vercel.app`**

### Option 2: Railway

**Steps:**
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Create new project → Deploy from GitHub repo
4. Select `kurdim12/vcoders-sub`
5. Add environment variables
6. Deploy!

### Option 3: Netlify

**Steps:**
1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. New site from Git → Choose repo
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Add environment variables
7. Deploy!

📖 **Full deployment guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 📁 Project Structure

```
agently/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Dashboard (root)
│   ├── layout.tsx                # Root layout
│   ├── courses/                  # Course pages
│   │   ├── page.tsx              # Courses list
│   │   └── [courseId]/           # Single course route
│   │       ├── page.tsx          # Course layout wrapper
│   │       ├── loading.tsx       # Loading state
│   │       └── error.tsx          # Error boundary
│   ├── study-plan/               # Study plan page
│   ├── assignments/              # Assignments Kanban
│   ├── exams/                    # Exams timeline
│   ├── notes/                    # Notes editor
│   ├── resources/                # Resources library
│   ├── tutor/                    # Global tutor chat
│   ├── agents/                   # Agent Lab
│   ├── settings/                 # Settings page
│   ├── auth/                     # Authentication
│   │   ├── signin/
│   │   └── signup/
│   └── api/                      # API routes
│       ├── ai/route.ts           # AI orchestration
│       ├── auth/[...nextauth]/   # NextAuth
│       └── storage/route.ts       # Storage API
│
├── components/                   # React components
│   ├── course-layout.tsx         # Main course layout
│   ├── course-context.tsx        # Course context provider
│   ├── course/                   # Course-specific components
│   │   ├── overview.tsx
│   │   ├── materials.tsx
│   │   ├── assignments.tsx
│   │   ├── planner.tsx
│   │   ├── tutor.tsx
│   │   ├── notes.tsx
│   │   ├── exams.tsx
│   │   ├── flashcards.tsx
│   │   ├── analytics.tsx
│   │   └── settings.tsx
│   ├── ui/                       # shadcn/ui components
│   ├── auto-actions-panel.tsx    # Proactive suggestions
│   ├── voice-input.tsx          # Voice input component
│   └── workflow-visualization.tsx # Agent workflow
│
├── lib/                          # Core libraries
│   ├── store.ts                  # Zustand store
│   ├── types.ts                  # TypeScript types
│   ├── seed.ts                   # Seed data
│   ├── storage.ts                # Storage utilities
│   ├── ai.ts                     # AI client helpers
│   ├── retrieval.ts              # TF-IDF retrieval
│   ├── orchestrator/             # Multi-agent orchestration
│   │   ├── orchestrator.ts       # Main orchestrator
│   │   ├── tools.ts              # Agent tools
│   │   ├── memory.ts             # Agent memory
│   │   └── types.ts              # Orchestration types
│   ├── automation/               # Auto-actions
│   ├── hooks/                    # Custom hooks
│   │   ├── xp.ts                 # XP/Streak system
│   │   └── analytics.ts          # Analytics rollup
│   ├── spaced-repetition.ts      # SM-2 algorithm
│   ├── calendar-export.ts        # iCal generation
│   ├── pdf-extraction.ts         # PDF text extraction
│   └── predictive-analytics.ts   # Performance predictions
│
├── public/                       # Static assets
│   ├── manifest.json             # PWA manifest
│   ├── sw.js                     # Service worker
│   └── icon-*.png                # PWA icons
│
├── tests/                        # Playwright tests
│   ├── dashboard.spec.ts
│   ├── study-plan.spec.ts
│   └── settings.spec.ts
│
└── Configuration files
    ├── next.config.mjs           # Next.js config
    ├── tailwind.config.ts        # Tailwind config
    ├── tsconfig.json             # TypeScript config
    └── package.json              # Dependencies
```

---

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **React 18**: Modern React with hooks

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Beautiful, accessible components
- **Radix UI**: Unstyled, accessible primitives
- **Lucide React**: 400+ icons
- **next-themes**: Dark/light mode support

### State Management
- **Zustand**: Lightweight state management
- **localStorage**: Browser persistence (demo mode)
- **Supabase**: Cloud database (cloud mode)

### AI & Machine Learning
- **OpenAI API**: GPT-4 compatible models
- **TF-IDF**: Client-side document retrieval
- **Cosine Similarity**: Semantic search
- **Multi-Agent Orchestration**: Intelligent routing

### Additional Libraries
- **recharts**: Data visualization
- **date-fns**: Date utilities
- **react-markdown**: Markdown rendering
- **pdfjs-dist**: PDF text extraction
- **next-auth**: Authentication (cloud mode)
- **@tanstack/react-query**: Data fetching (ready for cloud)

### Development Tools
- **Playwright**: E2E testing
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Type checking

---

## 💻 Development

### Running Locally

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Lint code
npm run lint
```

### Code Structure Guidelines

- **Components**: Reusable UI components in `components/`
- **Pages**: Route handlers in `app/` directory
- **API Routes**: Server endpoints in `app/api/`
- **Utilities**: Helper functions in `lib/`
- **Types**: TypeScript definitions in `lib/types.ts`

### Adding New Features

1. **New Page**: Create route in `app/` directory
2. **New Component**: Add to `components/` directory
3. **New Agent**: Extend `lib/orchestrator/orchestrator.ts`
4. **New Type**: Add to `lib/types.ts`
5. **Update Store**: Modify `lib/store.ts` for state

### Testing

```bash
# Run all tests
npm test

# Run specific test file
npx playwright test tests/dashboard.spec.ts

# Run in UI mode
npm run test:ui

# Debug tests
npx playwright test --debug
```

---

## 🎯 Platform Modes

### Demo Mode (Default)
- **Storage**: Browser localStorage
- **No Setup**: Works immediately
- **AI**: Uses OpenAI API if key provided, otherwise mock responses
- **Best For**: Quick testing, demos, personal use

### Cloud Mode
- **Storage**: Supabase PostgreSQL
- **Authentication**: NextAuth.js
- **Features**: Multi-device sync, real authentication, file storage
- **Best For**: Production, multi-user, team collaboration

### Offline Mode
- **Storage**: Browser localStorage
- **AI**: Deterministic mock responses
- **No Network**: Works completely offline
- **Best For**: Testing, restricted environments, offline use

---

## 📊 Key Metrics & Statistics

- **Total Files**: 125+ files
- **Lines of Code**: 28,000+ lines
- **Components**: 30+ React components
- **Pages**: 10+ complete pages
- **AI Agents**: 7 specialized agents
- **Course Tabs**: 9 tabs per course
- **Test Coverage**: Playwright E2E tests

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint and Prettier
- Write tests for new features
- Update documentation
- Follow existing code style

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **shadcn/ui** for beautiful components
- **Radix UI** for accessible primitives
- **Next.js** team for the amazing framework
- **OpenAI** for powerful AI capabilities
- **Supabase** for backend infrastructure

---

## 📞 Support & Resources

- **Documentation**: See `/docs` folder for detailed guides
- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Join discussions for questions and ideas

---

## 🗺️ Roadmap

### Planned Features
- [ ] Real-time collaborative study rooms
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Integration with LMS platforms
- [ ] Browser extension
- [ ] Offline-first architecture improvements

---

**Built with ❤️ for students everywhere**
