# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development Workflow
- `npm run dev` - Start development server at http://localhost:5173/ (or port shown in terminal)
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

### Project Architecture

This is a React + TypeScript + Vite birthday surprise website with a scroll-based yellow brick road journey. The application uses a vertical scrolling animation system where content reveals progressively as the user scrolls.

#### Key Components Structure
- **App.tsx** - Main container with 6 scroll sections using Intersection Observer
- **BackgroundGradient.tsx** - Animated blue sky gradient background
- **YellowBrickRoad.tsx** - SVG-based road that progressively reveals based on scroll progress
- **ScrollItem.tsx** - Animated content cards that slide in from left/right sides
- **PresentReveal.tsx** - Final birthday gift card revelation with animations

#### Animation System
The app uses two main scroll animation patterns:
1. **Individual section reveals** - `useScrollAnimation` hook for triggering content when sections come into view
2. **Progressive road animation** - `useRoadAnimation` hook that maps scroll progress to SVG path drawing

#### Technology Stack
- **React 19** + **TypeScript** - Component framework with strict typing
- **Tailwind CSS v3** - Utility-first styling with custom animations and colors
- **Vite** - Build tool and dev server
- **SVG-based graphics** - Complex YellowBrickRoad component with brick patterns and City of Oz

#### Responsive Design
- Mobile-first approach with responsive breakpoints (md:, lg:)
- Touch-friendly scroll interactions
- Viewport-based sizing for animations

#### Custom Animations
Defined in `tailwind.config.js`:
- `fade-in-up` - Content entrance animation
- `slide-in-left/right` - ScrollItem reveal animations  
- `bounce-gentle` - Scroll indicator animation
- Custom keyframes for smooth transitions

#### Performance Considerations
- Uses Intersection Observer for efficient scroll detection
- Hardware-accelerated CSS transforms
- SVG path animation with stroke-dasharray/offset
- Conditional rendering based on visibility state

#### Development Notes
- All animations are CSS-based with smooth transitions
- TypeScript strict mode enabled
- ESLint configured for React and TypeScript
- Components follow consistent prop interface patterns
- Hooks handle all scroll logic and state management