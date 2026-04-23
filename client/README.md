# ReGen Frontend - AI-Powered Waste Management Platform

![Next.js](https://img.shields.io/badge/Next.js-15.5.5-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178c6?logo=typescript)

The frontend application for ReGen, a comprehensive waste management and sustainability platform focused on SDG 13: Climate Action.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🌟 Overview

ReGen's frontend is a modern, responsive web application built with Next.js 15 and React 19. It provides an intuitive interface for users to:

- Track and log waste recycling activities
- Get AI-powered sustainability advice
- View community leaderboards
- Find nearby recycling centers
- Monitor environmental impact (CO₂ savings)
- Manage waste collection schedules

**Live Demo:** https://regen-pi.vercel.app/  
**Backend API:** https://regen-0n58.onrender.com/api

---

## ✨ Features

### Core Features
- 🔐 **Authentication** - JWT-based secure login/registration
- 📊 **Dashboard** - Real-time statistics and analytics
- 🗑️ **Waste Logging** - Track recycling activities with photos
- 🤖 **AI Guide** - Groq-powered sustainability chatbot
- 🏆 **Leaderboard** - Community rankings and achievements
- 🗺️ **Recycling Centers** - Interactive map of nearby facilities
- 📱 **Responsive Design** - Mobile-first, works on all devices
- 🎨 **Modern UI** - Clean, intuitive interface with TailwindCSS

### Technical Features
- ⚡ **Fast Performance** - Next.js 15 with Turbopack
- 🔄 **Real-time Updates** - Dynamic data fetching
- 🧪 **Tested** - 16 Jest tests with React Testing Library
- 🎯 **Type-Safe** - TypeScript support
- 🔒 **Protected Routes** - Authentication guards
- 📄 **Pagination** - Efficient data loading
- 🌐 **API Integration** - RESTful backend communication

---

## 🛠️ Tech Stack

### Core Framework
- **Next.js 15.5.5** - React framework with App Router
- **React 19.1.0** - UI library
- **TailwindCSS 4.0** - Utility-first CSS framework

### UI Components & Icons
- **Lucide React** - Beautiful icon library
- **Custom Components** - Reusable UI components

### State Management & Data Fetching
- **React Context** - Global state (Auth, Theme)
- **Fetch API** - HTTP requests to backend

### Testing
- **Jest 29.7.0** - Testing framework
- **React Testing Library 14.1.2** - Component testing
- **@testing-library/jest-dom** - Custom matchers

### Development Tools
- **ESLint** - Code linting
- **Turbopack** - Fast bundler (Next.js 15)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.18.0 or higher
- **npm** 10.x or higher (or yarn/pnpm)
- **Backend API** running (see `/server/README.md`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jeremymarube/regen.git
   cd regen/client
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```
   
   *Note: `--legacy-peer-deps` is needed due to React 19 compatibility*

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_ENV=development
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
client/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── layout.js          # Root layout
│   │   └── page.js            # Home page
│   │
│   ├── components/            # React components
│   │   ├── auth/             # Auth components
│   │   │   └── ProtectedRoute.jsx
│   │   ├── common/           # Shared components
│   │   │   ├── Button.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── Modal.jsx
│   │   ├── community/        # Community features
│   │   ├── dashboard/        # Dashboard components
│   │   ├── layout/           # Layout components
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── ui/               # UI primitives
│   │   ├── waste/            # Waste management
│   │   └── __tests__/        # Component tests
│   │
│   ├── context/              # React Context
│   │   ├── AuthContext.js   # Authentication state
│   │   └── ThemeContext.js  # Theme state
│   │
│   ├── services/             # API services
│   │   ├── api.js           # Axios instance
│   │   ├── authService.js   # Auth API calls
│   │   ├── wasteService.js  # Waste API calls
│   │   └── __tests__/       # Service tests
│   │
│   ├── utils/                # Utility functions
│   │   ├── formatters.js    # Data formatters
│   │   └── validators.js    # Form validators
│   │
│   └── styles/               # Global styles
│       └── globals.css      # TailwindCSS imports
│
├── public/                   # Static assets
│   ├── images/              # Images
│   └── icons/               # Icons
│
├── jest.config.js           # Jest configuration
├── jest.setup.js            # Jest setup
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # TailwindCSS configuration
├── package.json             # Dependencies
└── README.md                # This file
```

---

## 📜 Available Scripts

### Development
```bash
# Start development server with Turbopack
npm run dev

# Start development server (legacy)
npm run dev:legacy
```

### Building
```bash
# Create production build
npm run build

# Start production server
npm run start
```

### Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

### Linting
```bash
# Run ESLint
npm run lint

# Fix ESLint errors
npm run lint:fix
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_API_URL_PROD=https://regen-0n58.onrender.com/api

# Environment
NEXT_PUBLIC_ENV=development

# Feature Flags (optional)
NEXT_PUBLIC_ENABLE_AI_GUIDE=true
NEXT_PUBLIC_ENABLE_MAPS=true

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### Environment Variables Explained

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL for development | Yes |
| `NEXT_PUBLIC_API_URL_PROD` | Backend API URL for production | Yes |
| `NEXT_PUBLIC_ENV` | Environment (development/production) | Yes |
| `NEXT_PUBLIC_ENABLE_AI_GUIDE` | Enable/disable AI chatbot | No |
| `NEXT_PUBLIC_ENABLE_MAPS` | Enable/disable maps feature | No |
| `NEXT_PUBLIC_GA_ID` | Google Analytics tracking ID | No |

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- ProtectedRoute.test.jsx
```

### Test Coverage

Current test coverage:
- **Component Tests:** 10 tests
- **Service Tests:** 6 tests
- **Total:** 16 tests (100% passing)

**Test Files:**
- `src/components/__tests__/ProtectedRoute.test.jsx`
- `src/components/__tests__/Sidebar.test.jsx`
- `src/services/__tests__/authService.test.js`

### Writing Tests

Example component test:
```javascript
import { render, screen } from '@testing-library/react';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   ```
   Framework Preset: Next.js
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install --legacy-peer-deps
   ```

3. **Set Environment Variables**
   - Add all `NEXT_PUBLIC_*` variables
   - Set `NEXT_PUBLIC_API_URL` to production backend URL

4. **Deploy**
   - Click "Deploy"
   - Vercel will auto-deploy on every push to `main`

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start

# Or use PM2
pm2 start npm --name "regen-frontend" -- start
```

---

## 🎨 Styling Guide

### TailwindCSS Classes

Common utility classes used in ReGen:

```jsx
// Buttons
<button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
  Click Me
</button>

// Cards
<div className="bg-white rounded-lg shadow-md p-6">
  Card Content
</div>

// Forms
<input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
```

### Color Palette

```css
/* Primary Colors */
--green-600: #10B981  /* Primary green */
--green-700: #059669  /* Hover state */

/* Neutral Colors */
--gray-50: #F9F9F9    /* Background */
--gray-100: #F3F4F6   /* Light gray */
--gray-600: #4B5563   /* Text */
--gray-900: #111827   /* Dark text */

/* Semantic Colors */
--red-600: #DC2626    /* Error */
--yellow-500: #F59E0B /* Warning */
--blue-600: #2563EB   /* Info */
```

---

## 🔌 API Integration

### API Service Example

```javascript
// src/services/wasteService.js
import api from './api';

export const createWasteLog = async (data) => {
  const response = await api.post('/waste-logs/', data);
  return response.data;
};

export const getWasteLogs = async (page = 1, perPage = 10) => {
  const response = await api.get(`/waste-logs/all?page=${page}&per_page=${perPage}`);
  return response.data;
};
```

### Using in Components

```javascript
import { useEffect, useState } from 'react';
import { getWasteLogs } from '@/services/wasteService';

export default function WasteList() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getWasteLogs(1, 10);
        setLogs(data.data);
      } catch (error) {
        console.error('Error fetching logs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLogs();
  }, []);

  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {logs.map(log => (
        <div key={log.id}>{log.waste_type}</div>
      ))}
    </div>
  );
}
```

---

## 🤝 Contributing

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Write tests for new features
   - Update documentation

3. **Test your changes**
   ```bash
   npm test
   npm run lint
   ```

4. **Commit your changes**
   ```bash
   git commit -m "feat: add new feature"
   ```
   
   Follow [Conventional Commits](https://www.conventionalcommits.org/)

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Style

- Use functional components with hooks
- Follow React best practices
- Use TypeScript for type safety (optional)
- Keep components small and focused
- Write meaningful test cases

---

## 📚 Additional Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

### ReGen Docs
- [API Documentation](../docs/SWAGGER.md)
- [Database Schema](../docs/DATABASE_SCHEMA.md)
- [AI Integration](../docs/AI_API_INTEGRATION.md)
- [Deployment Guide](../docs/DEPLOYMENT_STATUS.md)

### Project Links
- **GitHub:** https://github.com/Jeremymarube/regen
- **Backend API:** https://regen-0n58.onrender.com/api
- **Issues:** https://github.com/Jeremymarube/regen/issues

---

## 🐛 Troubleshooting

### Common Issues

**Issue: `npm install` fails**
```bash
# Solution: Use legacy peer deps
npm install --legacy-peer-deps
```

**Issue: Tests fail with module errors**
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

**Issue: API requests fail**
```bash
# Solution: Check backend is running and NEXT_PUBLIC_API_URL is correct
echo $NEXT_PUBLIC_API_URL
```

**Issue: Styles not loading**
```bash
# Solution: Rebuild Tailwind
npm run dev
```

---

## 📄 License

This project is part of the ReGen platform. See the main repository for license information.

---

## 👥 Team

- **Jeremy Marube** - [@Jeremymarube](https://github.com/Jeremymarube)
- **Lauren** - Frontend Developer
- **Patrick** - Backend Developer

---

## 📞 Support

For support and questions:
- **Email:** support@regen.com
- **GitHub Issues:** https://github.com/Jeremymarube/regen/issues
- **Documentation:** [/docs](../docs/)

---

**Built with ❤️ for SDG 13: Climate Action**

*Last Updated: October 29, 2025*
