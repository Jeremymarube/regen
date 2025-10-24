# Running ReGen from VS Code

## Quick Start

### Method 1: Using Scripts (Easiest)

Open **2 terminals** in VS Code and run:

**Terminal 1 - Backend:**
```bash
./start-backend.sh
```

**Terminal 2 - Frontend:**
```bash
./start-frontend.sh
```

### Method 2: Manual Commands

**Terminal 1 - Backend:**
```bash
cd server
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd client
source ~/.nvm/nvm.sh && nvm use 18
npm run dev
```

## Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health

## VS Code Tips

### Split Terminals
1. Click the **"+"** icon in the terminal panel to create a new terminal
2. Or use: `Ctrl+Shift+5` (Linux) / `Cmd+Shift+5` (Mac)
3. Run backend in one terminal, frontend in the other

### Keep Terminals Running
- Both servers need to stay running while you use the app
- Press `Ctrl+C` in each terminal to stop the servers

### Auto-Reload
- **Backend:** Auto-reloads when you save Python files (Flask debug mode)
- **Frontend:** Auto-reloads when you save React/Next.js files (Turbopack)

## Troubleshooting

### Port Already in Use
If you get "port already in use" errors:

**Backend (Port 5000):**
```bash
lsof -ti:5000 | xargs kill -9
```

**Frontend (Port 3000):**
```bash
lsof -ti:3000 | xargs kill -9
```

### Node Version Issues
Make sure you're using Node 18+:
```bash
source ~/.nvm/nvm.sh
nvm use 18
node --version  # Should show v18.x.x
```

### Database Issues
If you need to reset the database:
```bash
cd server
rm regen.db
python app.py  # Will recreate the database
```

## Development Workflow

1. ✅ Start both servers (backend + frontend)
2. ✅ Open http://localhost:3000 in your browser
3. ✅ Register a new account
4. ✅ Start logging waste and tracking your impact!
5. ✅ Make code changes - servers auto-reload
6. ✅ Press `Ctrl+C` in terminals when done

## Features Available

- ✅ User Registration & Authentication
- ✅ Waste Logging with CO₂ Calculation
- ✅ Dashboard with Impact Statistics
- ✅ Community Leaderboard
- ✅ AI Sustainability Guide
- ✅ Profile Management
- ✅ Waste Management (View/Edit/Delete logs)

Happy coding! 🚀🌱
