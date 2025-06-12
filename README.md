# AION Country Explorer

web application for exploring countries around the world. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Country Listing**: Browse all countries with search and region filtering
- **Detailed Country Pages**: View detailed information about any country
- **Favorites Management**: Save and manage your favorite countries
- **Modern Design**: Clean, responsive UI with light/dark theme
- **Performance Optimized**: Static generation and server-side rendering
- **Mobile Friendly**: Fully responsive design for all devices

## Tech Stack

- **Framework**: Next.js 15.3.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: radix ui
- **State Management**: Zustand
- **Icons**: Lucide React
- **Data Source**: REST Countries API: (https://restcountries.com/)

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd aion-country-explorer
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Credentials

use these credentials to login:

- **Username**: `testuser`
- **Password**: `password123`

### env: create a .env file and use this base url

```bash
NEXT_PUBLIC_REST_COUNTRIES_API_URL=https://restcountries.com/v3.1
```

## Architecture & Design Decisions

### Static Site Generation (SSG)

The application uses Next.js App Router with static generation for optimal performance:

- **Homepage**: Statically generated with country data fetched at build time
- **Country Detail Pages**: Pre-generated for all countries using `generateStaticParams`
- **Revalidation**: Data is revalidated every 24 hours to keep information fresh

This approach provides:

- Fast loading times
- Better SEO
- Reduced API calls
- Excellent user experience

### State Management

**Zustand** was chosen for state management due to its:

- Lightweight footprint
- Simple API
- TypeScript support
- Persistence capabilities
- No boilerplate code

The application uses three separate stores:

- **Auth Store**: Manages authentication state and user session
- **Favorites Store**: Handles favorite countries with localStorage persistence
- **Search Store**: Manages search and filter state for real-time UI updates

### Authentication

A mock authentication system is implemented that:

- Stores session data in localStorage via Zustand persistence
- Protects routes using the `AuthGuard` component
- Redirects unauthenticated users to the login page
- Provides a realistic login experience with form validation

### API Integration

The app integrates with the REST Countries API:

- Uses field selection to optimize payload size
- Implements proper error handling
- Includes loading states and skeleton components
- Caches responses using Next.js built-in caching

### Responsive Design

The design follows mobile-first principles:

- **Mobile**: Single column layout with touch-friendly interactions
- **Tablet**: 2-3 column grid layouts
- **Desktop**: 4+ column layouts with hover effects
- **Breakpoints**: Tailored for optimal viewing at all screen sizes

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server

## Features in Detail

### Search and Filtering

- Real-time search by country name
- Filter by region (Africa, Americas, Asia, Europe, Oceania)
- Clear filters functionality
- Instant results with no page reloads

### Country Details

- Comprehensive country information
- Native names and official names
- Population, capital, currencies, languages, Timezones etc.
- Border countries with navigation links
- High-quality flag images with fallbacks

### Favorites System

- Add/remove countries from favorites
- Persistent storage across sessions
- Visual indicators for favorite status
- Dedicated favorites page

### Theme Support

- Light and dark mode
- Smooth transitions
- Consistent color scheme

### Deployed Netlify URL:

- [AION Country Explorer](https://aion-country-explorer.netlify.app/)
