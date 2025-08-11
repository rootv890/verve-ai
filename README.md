# Verve AI

A modern, AI-powered conversational platform built with Next.js, featuring intelligent customer support automation and seamless conversation management.

## 18: Dashboard Chat

- A powerful dashboard for managing conversations, integrating AI capabilities, and providing real-time support.

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
