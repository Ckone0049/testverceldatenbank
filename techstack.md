# Tech Stack - Next.js Blog Application

## 🎯 Überblick
Moderne Full-Stack-Webanwendung mit Next.js, PostgreSQL und OAuth-Authentifizierung.

## 📋 Frontend

### Core Framework
- **Next.js 12.0.10** - React Framework mit SSR/SSG
- **React 17.0.2** - UI Library
- **TypeScript 5.1.0** - Type Safety

### Styling & UI
- **Tailwind CSS 4.1.10** - Utility-First CSS Framework
- **PostCSS 8.5.6** - CSS Processing
- **Autoprefixer 10.4.21** - CSS Vendor Prefixes
- **@tailwindcss/typography 0.5.16** - Typography Plugin

### Navigation & Routing
- **Next.js Router** - File-based Routing
- **Dynamic Routes** - `/p/[id]` für Post-Details

## 🔐 Authentication & Authorization

### Auth Provider
- **NextAuth.js 4.24.11** - Authentication Solution
- **@auth/prisma-adapter 2.9.1** - Database Integration
- **GitHub OAuth** - Social Login Provider

### Session Management
- **Database Sessions** - Persistent Session Storage
- **JWT Tokens** - Secure Token Handling
- **CSRF Protection** - Cross-Site Request Forgery Protection

## 🗄️ Backend & Database

### Database
- **PostgreSQL** - Primary Database
- **Vercel Postgres** - Hosted Database Service
- **Prisma 6.10.1** - ORM & Database Toolkit
- **@prisma/client 6.10.1** - Type-safe Database Client

### API Layer
- **Next.js API Routes** - Serverless Functions
- **RESTful Endpoints** - CRUD Operations
- **Server-side Authentication** - Protected Routes

### Data Models
```typescript
// User, Post, Account, Session, VerificationToken
```

## 🧪 Testing

### Testing Framework
- **Jest 30.0.2** - Testing Framework
- **@testing-library/react 12.1.5** - React Testing Utilities
- **@testing-library/jest-dom 6.6.3** - DOM Testing Matchers
- **@testing-library/user-event 14.6.1** - User Interaction Testing
- **jest-environment-jsdom 30.0.2** - Browser Environment

### Test Configuration
- **babel-jest 30.0.2** - Jest Babel Integration
- **Coverage Reports** - Code Coverage Analysis
- **CI/CD Integration** - Automated Testing

## 🚀 Deployment & Hosting

### Platform
- **Vercel** - Hosting & Deployment Platform
- **Serverless Functions** - API Routes
- **Edge Network** - Global CDN
- **Automatic Deployments** - Git Integration

### Build Process
- **Next.js Build** - Production Optimization
- **Prisma Generate** - Database Client Generation
- **Static Generation** - Pre-rendered Pages
- **Server-Side Rendering** - Dynamic Content

## 🛠️ Development Tools

### Package Management
- **npm** - Package Manager
- **package.json** - Dependency Management

### Code Quality
- **TypeScript** - Static Type Checking
- **ESLint** - Code Linting (configured)
- **Prettier** - Code Formatting (configured)

### Development Scripts
```json
{
  "dev": "next",
  "build": "prisma generate && next build",
  "start": "next start",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "seed": "tsx prisma/seed.ts"
}
```

## 📦 Key Dependencies

### Production Dependencies
```json
{
  "@auth/prisma-adapter": "^2.9.1",
  "@prisma/client": "^6.10.1",
  "next": "12.0.10",
  "next-auth": "^4.24.11",
  "prisma": "^6.10.1",
  "react": "17.0.2",
  "react-dom": "17.0.2",
  "react-markdown": "8.0.0"
}
```

### Development Dependencies
```json
{
  "@tailwindcss/postcss": "^4.1.10",
  "@tailwindcss/typography": "^0.5.16",
  "tailwindcss": "^4.1.10",
  "typescript": "^5.1.0",
  "tsx": "^4.20.3"
}
```

## 🏗️ Architecture Patterns

### Design Patterns
- **Component-Based Architecture** - Reusable UI Components
- **API Routes Pattern** - Serverless Backend Functions
- **Database-First Approach** - Prisma Schema-driven Development
- **Authentication Middleware** - Protected Route Guards

### File Structure
```
/
├── components/          # Reusable UI Components
├── pages/              # Next.js Pages & API Routes
├── lib/                # Utility Functions
├── prisma/             # Database Schema & Migrations
├── styles/             # Global Styles & Tailwind Config
├── tests/              # Test Files
└── public/             # Static Assets
```

## 🔒 Security Features

### Authentication Security
- **OAuth 2.0** - Secure Third-party Authentication
- **Session Management** - Database-stored Sessions
- **CSRF Protection** - Built-in Security
- **Secure Cookies** - HTTPOnly & Secure Flags

### API Security
- **Authentication Middleware** - Protected Endpoints
- **Authorization Checks** - Resource Ownership Validation
- **Input Validation** - Request Data Sanitization
- **Error Handling** - Secure Error Messages

### Data Security
- **Environment Variables** - Secure Configuration
- **Database Encryption** - At-rest & In-transit
- **SQL Injection Prevention** - Prisma ORM Protection
- **XSS Prevention** - React Built-in Protection

## 📊 Performance Features

### Optimization
- **Static Site Generation** - Pre-rendered Pages
- **Image Optimization** - Next.js Image Component
- **Code Splitting** - Automatic Bundle Splitting
- **Tree Shaking** - Unused Code Elimination

### Caching
- **Browser Caching** - Static Asset Caching
- **CDN Caching** - Vercel Edge Network
- **Database Connection Pooling** - Prisma Connection Management

## 🌐 Browser Support
- **Modern Browsers** - Chrome, Firefox, Safari, Edge
- **Mobile Responsive** - Touch-friendly Design
- **Progressive Enhancement** - Graceful Degradation