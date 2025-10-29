# ReGen Project Documentation

## 📚 Documentation Index

This directory contains comprehensive documentation for the ReGen project.

### Available Documentation

1. **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)**
   - Complete database schema with ERD
   - Table definitions and relationships
   - DBDiagram.io code for visual generation
   - Indexes and calculated fields

2. **[SWAGGER.md](./SWAGGER.md)**
   - API endpoint documentation
   - Swagger UI access instructions
   - Request/response examples
   - Pagination guide
   - Authentication details

3. **[DB_Diagram.png](./DB_Diagram.png)**
   - Visual Entity Relationship Diagram
   - Generate from DATABASE_SCHEMA.md using dbdiagram.io

4. **[Figma_Design_Link.txt](./Figma_Design_Link.txt)**
   - Frontend wireframes and mockups
   - UI/UX design specifications

## 🚀 Quick Start

### Viewing API Documentation

1. Start the backend server:
   ```bash
   cd server
   python app.py
   ```

2. Access Swagger UI:
   - Local: http://localhost:5000/api/docs/
   - Production: https://regen-0n58.onrender.com/api/docs/

### Generating Database Diagram

1. Open [dbdiagram.io](https://dbdiagram.io/)
2. Copy the DBML code from `DATABASE_SCHEMA.md`
3. Paste into the editor
4. Export as PNG and save as `DB_Diagram.png`

## 📋 Testing Documentation

### Backend Tests
Located in `/server/tests/`:
- `test_auth.py` - Authentication endpoint tests
- `test_waste.py` - Waste management tests
- `conftest.py` - Test fixtures and configuration

Run tests:
```bash
cd server
pytest
```

### Frontend Tests
Located in `/client/src/components/__tests__/`:
- `ProtectedRoute.test.jsx` - Route protection tests
- `Sidebar.test.jsx` - Navigation component tests
- `/services/__tests__/authService.test.js` - Service layer tests

Run tests:
```bash
cd client
npm test
```

## 🔄 API Pagination

All listing endpoints support pagination:

**Endpoints with Pagination:**
- `GET /api/waste-logs/all`
- `GET /api/recycling-centers/`
- `GET /api/community/leaderboard`

**Parameters:**
- `page` (default: 1)
- `per_page` (default: 10, max: 100)

**Example:**
```bash
GET /api/waste-logs/all?page=2&per_page=20
```

See [SWAGGER.md](./SWAGGER.md) for detailed pagination documentation.

## 🤖 AI Integration

ReGen uses **Groq API** (llama-3.3-70b-versatile) for:
- Sustainability advice chatbot
- Waste management guidance
- Environmental tips

**Endpoint:** `POST /api/ai-guide`

## 📊 Project Statistics

- **Backend Tests:** 15+ test cases
- **Frontend Tests:** 8+ test cases
- **API Endpoints:** 20+ endpoints
- **Database Models:** 6 models + 1 association table
- **Paginated Endpoints:** 3 endpoints
- **Swagger Documented:** All major endpoints

## 🔗 Related Links

- **Main README:** [../README.md](../README.md)
- **Backend README:** [../server/README.md](../server/README.md) (if exists)
- **Frontend README:** [../client/README.md](../client/README.md)
- **GitHub Repository:** https://github.com/Jeremymarube/regen

## 📝 Contributing

When updating documentation:
1. Keep all docs in sync
2. Update version numbers
3. Add examples for new features
4. Test all code snippets

## 📧 Support

For documentation issues or questions:
- Create an issue on GitHub
- Contact: support@regen.com

---

**Documentation Version:** 1.0.0  
**Last Updated:** October 29, 2025
