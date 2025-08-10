# Verve AI

A modern, AI-powered conversational platform built with Next.js, featuring intelligent customer support automation and seamless conversation management.

## 17: Dashboard Inbox & Conversation Management

### 🎯 Major Features

#### Dashboard & Layout

- **Responsive Inbox Layout**: Implemented a sophisticated conversation inbox with resizable panels for optimal workspace utilization
- **Conversation Panel**: Enhanced conversation management with intuitive filtering and organization capabilities
- **Resizable Interface**: Added `ResizablePanelGroup` components for customizable dashboard layouts with persistent sizing

#### API & Data Management

- **Private Conversations API**: Implemented secure `getMany` endpoint for efficient conversation retrieval with pagination support
- **Infinite Scroll Integration**: Seamless conversation loading with performance-optimized infinite scroll triggers
- **Date Formatting**: Added `date-fns` library for consistent, localized timestamp formatting across the platform

#### UI/UX Enhancements

- **DiceBear Avatar System**: Custom avatar generation with glass collection for consistent user representation
- **Conversation Status Icons**: Brand-matched status indicators (resolved, unresolved, escalated) with semantic color coding
- **Enhanced Tooltips**: Contextual tooltip system for collapsed sidebar states, improving accessibility
- **Skeleton Loading States**: Professional loading animations for conversations panel and data fetching

#### State Management

- **Jotai Integration**: Implemented atomic state management for `SelectItem` components with localStorage persistence
- **Contact Session Management**: Robust session handling with organization-scoped contact session atoms
- **Filter State Persistence**: Conversation filter preferences maintained across sessions

### 🛠 Technical Improvements

#### Component Architecture

- Modular widget screen system (`WidgetInboxScreen`, `WidgetChatScreen`)
- Reusable UI components with TypeScript definitions
- Consistent design system integration across web and widget applications

#### Performance Optimizations

- Efficient pagination with `usePaginatedQuery` hooks
- Optimized infinite scroll implementation with configurable load sizes
- Memoized avatar generation for improved rendering performance

#### Developer Experience

- Enhanced monorepo workspace configuration
- Improved TypeScript definitions and component props
- Streamlined component organization and file structure

### 🔧 Dependencies Added

- `date-fns` for robust date formatting and manipulation
- Enhanced Convex integration for real-time data synchronization

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
turbo dev

# Build for production
turbo build
```

## Project Structure

```
apps/
├── web/          # Main dashboard application
└── widgets/      # Embeddable widget components

packages/
├── backend/      # Convex backend with real-time data
├── ui/          # Shared component library
└── eslint-config/  # Shared linting configuration
```

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Convex (real-time database)
- **State Management**: Jotai
- **UI Components**: Radix UI, shadcn/ui
- **Monorepo**: Turborepo with pnpm workspaces
