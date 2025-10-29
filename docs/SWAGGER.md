# ReGen API - Swagger Documentation

## Accessing Swagger UI

Once the backend server is running, access the interactive Swagger documentation at:

**URL:** `http://localhost:5000/api/docs/`

For production: `https://regen-0n58.onrender.com/api/docs/`

## API Overview

The ReGen API provides endpoints for:
- **Authentication**: User registration, login, and profile management
- **Waste Management**: CRUD operations for waste logs with pagination
- **Recycling Centers**: Manage and search recycling facilities
- **Community**: Leaderboard and user rankings
- **AI Guide**: Sustainability advice chatbot
- **Dashboard**: User statistics and analytics

## Authentication

All protected endpoints require a JWT Bearer token in the Authorization header:

```
Authorization: Bearer <your_access_token>
```

### Getting a Token

1. **Register**: `POST /api/auth/register`
2. **Login**: `POST /api/auth/login`
3. Use the returned `access_token` in subsequent requests

## Key Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Create new user account | No |
| POST | `/api/auth/login` | Login and get access token | No |
| POST | `/api/auth/reset-password` | Reset user password | No |
| GET | `/api/auth/me` | Get current user profile | Yes |
| PUT | `/api/auth/profile` | Update user profile | Yes |

### Waste Management Endpoints

| Method | Endpoint | Description | Auth Required | Pagination |
|--------|----------|-------------|---------------|------------|
| POST | `/api/waste-logs/` | Create waste log entry | Yes | No |
| GET | `/api/waste-logs/` | Get user's waste logs | Yes | No |
| GET | `/api/waste-logs/all` | Get all waste logs (admin) | No | **Yes** |
| PUT | `/api/waste-logs/<id>/status` | Update collection status | No | No |
| DELETE | `/api/waste-logs/<id>` | Delete waste log | No | No |

### Recycling Centers Endpoints

| Method | Endpoint | Description | Auth Required | Pagination |
|--------|----------|-------------|---------------|------------|
| GET | `/api/recycling-centers/` | Get recycling centers | No | **Yes** |
| POST | `/api/recycling-centers/` | Create new center | No | No |
| PUT | `/api/recycling-centers/<id>` | Update center | No | No |
| DELETE | `/api/recycling-centers/<id>` | Delete center | No | No |

### Community Endpoints

| Method | Endpoint | Description | Auth Required | Pagination |
|--------|----------|-------------|---------------|------------|
| GET | `/api/community/leaderboard` | Get user rankings | No | **Yes** |

### Dashboard Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/dashboard/` | Get user statistics | Yes |

### AI Guide Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/ai-guide` | Get AI sustainability advice | No |

## Pagination Parameters

All paginated endpoints support the following query parameters:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number (starts at 1) |
| `per_page` | integer | 10 | Items per page (max 100) |

### Pagination Response Format

```json
{
  "message": "Data fetched successfully",
  "data": [...],
  "pagination": {
    "page": 1,
    "per_page": 10,
    "total_items": 45,
    "total_pages": 5,
    "has_next": true,
    "has_prev": false,
    "next_page": 2,
    "prev_page": null
  }
}
```

### Example Paginated Requests

```bash
# Get first page of waste logs (10 items)
GET /api/waste-logs/all?page=1&per_page=10

# Get second page with 20 items
GET /api/waste-logs/all?page=2&per_page=20

# Get recycling centers, page 3
GET /api/recycling-centers/?page=3&per_page=15

# Get leaderboard, first 50 users
GET /api/community/leaderboard?page=1&per_page=50
```

## Example Requests

### 1. Register New User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe",
  "location": "Nairobi"
}
```

### 2. Create Waste Log

```bash
POST /api/waste-logs/
Authorization: Bearer <token>
Content-Type: application/json

{
  "waste_type": "plastic",
  "weight": 5.5,
  "co2_saved": 2.75,
  "disposal_method": "recycling",
  "collection_location": "Nairobi",
  "collection_status": "pending"
}
```

### 3. Get Paginated Waste Logs

```bash
GET /api/waste-logs/all?page=1&per_page=10
```

### 4. Get Leaderboard

```bash
GET /api/community/leaderboard?page=1&per_page=20
```

## Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid or missing token |
| 404 | Not Found |
| 500 | Internal Server Error |

## Testing with Swagger UI

1. Start the backend server: `python app.py`
2. Navigate to `http://localhost:5000/api/docs/`
3. Click on any endpoint to expand it
4. Click "Try it out"
5. Fill in the required parameters
6. For protected endpoints, click "Authorize" and enter: `Bearer <your_token>`
7. Click "Execute" to test the endpoint

## API Versioning

Current API Version: **v1.0.0**

## Rate Limiting

Currently no rate limiting is implemented. This may be added in future versions.

## Support

For API support or questions:
- Email: support@regen.com
- GitHub Issues: https://github.com/Jeremymarube/regen/issues

---

**Last Updated:** October 29, 2025
