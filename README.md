# Elevated Media House

A premium music distribution platform that combines professional distribution, AI-powered tools, and boutique label services for independent musicians.

## Overview

Elevated Media House helps artists turn their music into sustainable careers by providing:
- Global distribution to 150+ streaming platforms
- 7 AI-powered tools for marketing, design, and strategy
- Professional playlist pitching to 500+ curators
- Transparent royalty management with SplitShare™
- One-time pricing with no recurring fees

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS (Muted Noir design system)
- **Routing**: Wouter
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (OAuth with Google/GitHub)
- **Backend**: Supabase Edge Functions
- **Icons**: Lucide React

## Features

### Core Pages
- **Home Page**: Hero, pricing packages, testimonials, features, FAQ
- **Login Page**: OAuth authentication with Google and GitHub
- **Client Portal**: Dashboard with releases, analytics, submissions, and profile tabs
- **AI Tools Page**: 7 AI tools including Cover Art Generator and Marketing Copy Writer

### Design System: Muted Noir
- **Dark Mode (Default)**: Deep black (#0a0a0a) with gold accents (#FFD700)
- **Light Mode**: Warm cream (#f5f5f0) with bronze accents (#d4a574)
- **Typography**: Playfair Display (headings) + Inter (body)
- **Effects**: Film grain overlay, glass morphism, smooth transitions

### AI Powerhouse Toolkit
1. **Cover Art Generator** - Generate professional album artwork
2. **Marketing Copy Writer** - Create playlist pitches, social captions, bios
3. **Release Strategy Assistant** - Get personalized release timing
4. **Metadata Optimizer** - Optimize track metadata
5. **Analytics Insights** - Natural language data summaries
6. **Social Content Generator** - Create social media calendars
7. **Music Recommendation Engine** - Discover collaboration opportunities

### Additional Features
- Floating AI chatbot with knowledge base
- Email automation sequence (5 emails)
- Theme switching (dark/light mode)
- Fully mobile responsive
- Row Level Security (RLS) on all database tables

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase account

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Database Schema

### Tables
- **users**: User profiles and authentication
- **releases**: Distributed music releases with analytics
- **artist_submissions**: Release submission requests
- **service_packages**: Available pricing packages

### Security
All tables have Row Level Security (RLS) enabled with policies ensuring users can only access their own data.

## Environment Variables

The following environment variables are pre-configured:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

## Project Structure

```
src/
├── pages/              # Main application pages
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── ClientPortal.tsx
│   └── AITools.tsx
├── components/         # Reusable components
│   ├── ui/            # UI primitives (Button, Card)
│   ├── Header.tsx
│   └── Chatbot.tsx
├── contexts/          # React contexts
│   └── ThemeContext.tsx
├── lib/               # Utilities and config
│   ├── supabase.ts
│   └── utils.ts
├── _core/             # Core functionality
│   └── hooks/
│       └── useAuth.ts
└── index.css          # Global styles
```

## Color Palette

### Dark Mode (Default)
- Background: `#0a0a0a`
- Surface: `#1a1a1a`
- Primary: `#FFD700` (gold)
- Text: `#e5e5e5`

### Light Mode
- Background: `#f5f5f0`
- Surface: `#ffffff`
- Primary: `#d4a574` (bronze)
- Text: `#1a1a1a`

## Contributing

This is a private project for Elevated Media House. For questions or support, contact breonjohnson20x@gmail.com.

## License

© 2025 Elevated Media House. All rights reserved.
