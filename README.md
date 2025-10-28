# ReGen - AI Waste & Sustainability Assistant

## 📋 Project Overview
ReGen is a full-stack web application that helps users manage waste sustainably through AI-powered classification, carbon footprint tracking, and community engagement.

## Preview
<img width="1362" height="660" alt="2025-10-28 (2)" src="https://github.com/user-attachments/assets/c912b8dd-60fc-4f55-9a3a-cb60ae51cf71" />



## 🏗️ Architecture

### **Frontend (Next.js)**
- **Framework**: Next.js 15 with React
- **Styling**: Tailwind CSS
- **State Management**: React Context (AuthContext)
- **Routing**: Next.js App Router

### **Backend (Flask)**
- **Framework**: Flask
- **Database**: SQLite with SQLAlchemy ORM
- **Authentication**: JWT tokens
- **CORS**: Enabled for frontend-backend communication

## 🗄️ Database Models

### **User** (`users` table)
- Stores user profiles and authentication
- Relationships: WasteLogs (one-to-many), Rewards (one-to-many), Communities (many-to-many)

### **WasteLog** (`waste_logs` table) 
- Tracks waste recycling entries with CO₂ savings calculation
- Core functionality: Full CRUD operations

### **RecyclingCenter** (`recycling_centers` table)
- Manages waste facility locations and types
- Supports filtering by region and waste type

### **Reward** (`rewards` table)
- Tracks user points and achievements (structural implementation)

### **Community** (`communities` table)
- Groups users for collaborative sustainability (structural implementation)

## 🔐 Authentication Flow
1. **Register**: Creates user with hashed password
2. **Login**: Validates credentials, returns JWT token
3. **Protected Routes**: Frontend checks AuthContext for user session
4. **Auto-logout**: Token expiration handling

## 🚀 Key Features Implemented

### **Waste Management**
- **Log Waste**: Form with type, weight, location, CO₂ calculation
- **View History**: Dashboard with personal statistics
- **Manage Entries**: Edit status, delete logs

### **Sustainability Tracking**
- **CO₂ Savings**: Automatic calculation based on waste type
- **Points System**: Gamification with environmental impact scoring
- **Leaderboard**: Community ranking by sustainability metrics

### **User Experience**
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Live dashboard statistics
- **Error Handling**: Form validation and API error messages

## 🔌 API Endpoints

### **Authentication** (`/api/auth/`)
- `POST /register` - Create new user
- `POST /login` - User login
- `POST /reset-password` - Password reset
- `PUT /profile` - Update user profile
- `GET /me` - Get current user

### **Waste Management** (`/api/waste-logs/`)
- `GET /` - User's waste logs
- `GET /all` - All waste logs (admin)
- `POST /` - Create waste log
- `PUT /<id>/status` - Update collection status
- `DELETE /<id>` - Delete waste log

### **Community** (`/api/community/`)
- `GET /leaderboard` - User rankings

### **Dashboard** (`/api/dashboard/`)
- `GET /` - User statistics

### **Recycling Centers** (`/api/recycling-centers/`)
- `GET /` - Filterable center list
- `POST /` - Create new center
- `PUT /<id>` - Update center
- `DELETE /<id>` - Delete center

## 🎯 Learning Goals Achieved

✅ **Flask + SQLAlchemy backend**  
✅ **Many-to-many relationship** (user_community)  
✅ **4+ models** (User, WasteLog, RecyclingCenter, Reward, Community)  
✅ **5+ client routes** (dashboard, community, log, manage-waste, profile, centers)  
✅ **Full CRUD on WasteLog** following REST conventions  
✅ **Validations & error handling**  
✅ **useContext** for global state management  
✅ **New features**: CO₂ calculation algorithms, sustainability gamification

---

## Project Structure
```
Regen
├── client/ (Frontend - Next.js)
│   ├── app/ - Pages (auth, dashboard, profile)
│   ├── components/ - UI components
│   ├── services/ - API communication
│   └── context/ - Auth state management
│
└── server/ (Backend - Flask)
    ├── routes/ - API endpoints (auth, waste, community)
    ├── models/ - Database models
    ├── config.py - App configuration
    ├── app.py - Main application
    └── requirements.txt - Dependencies
```

## 🚀 Getting Started

### **Backend**
```bash
cd server
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### **Frontend**
```bash
cd client
npm install
npm run dev
```

## 🔮 Future Enhancements
- AI waste classification with image upload
- Mobile app version
- Carbon offset purchasing
- IoT smart bin integration
- Community challenges and events


---

**ReGen transforms waste management into an engaging sustainability journey!** 🌱

## License
This project is developed as part of a Phase 4 Full-Stack Application assignment. All rights reserved.

## Project Team

## Scrum Master
  -  Jeremy Marube

## Contributors
  -  Lauren Ann
  -  James Patrick

## Contact
   For questions or support regarding this application, please contact the development team or refer to the project documentation.
