# ReGen Database Schema - Entity Relationship Diagram

## Database Overview

ReGen uses SQLite (development) / PostgreSQL (production) with SQLAlchemy ORM.

## Database Models

### 1. User
**Table:** `users`

Stores user account information and authentication credentials.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String(36) | PRIMARY KEY | UUID |
| name | String(100) | NOT NULL | User's full name |
| email | String(120) | UNIQUE, NOT NULL, INDEXED | User's email address |
| password_hash | String(255) | NOT NULL | Bcrypt hashed password |
| location | String(100) | NULLABLE | User's location |
| created_at | DateTime | DEFAULT NOW | Account creation timestamp |
| updated_at | DateTime | DEFAULT NOW, ON UPDATE | Last update timestamp |

**Relationships:**
- One-to-Many with `WasteLog` (user.waste_logs)
- One-to-Many with `Reward` (user.rewards)
- One-to-Many with `Message` (user.messages)
- Many-to-Many with `Community` (via user_community table)

---

### 2. WasteLog
**Table:** `waste_logs`

Tracks waste recycling entries with CO₂ savings calculations.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String(36) | PRIMARY KEY | UUID |
| user_id | String(36) | FOREIGN KEY → users.id, NOT NULL | Owner of the waste log |
| waste_type | String(50) | NOT NULL | Type: plastic, paper, organic, metal, glass |
| weight | Float | NOT NULL | Weight in kilograms |
| image_url | String(255) | NULLABLE | Photo of waste item |
| date | DateTime | DEFAULT NOW | Log creation date |
| co2_saved | Float | NULLABLE | CO₂ saved in kg |
| disposal_method | String(100) | NULLABLE | Method: recycling, composting, etc. |
| collection_location | String(100) | NULLABLE | Pickup location |
| collection_status | String(20) | DEFAULT 'pending' | Status: pending, scheduled, collected |
| collection_date | DateTime | NULLABLE | Scheduled/actual collection date |

**Relationships:**
- Many-to-One with `User` (waste_log.user)

---

### 3. RecyclingCenter
**Table:** `recycling_centers`

Manages waste facility locations and accepted materials.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String(36) | PRIMARY KEY | UUID |
| name | String(100) | NOT NULL | Center name |
| location | String(255) | NOT NULL | Physical address |
| accepted_types | String(255) | NULLABLE | Comma-separated waste types |
| latitude | Float | NULLABLE | GPS latitude |
| longitude | Float | NULLABLE | GPS longitude |
| facility_type | String(50) | DEFAULT 'recycling' | Type: recycling, composting, etc. |
| contact | String(100) | NULLABLE | Phone/email contact |
| operating_hours | String(100) | NULLABLE | Business hours |
| is_active | Boolean | DEFAULT TRUE | Active status |

**Relationships:**
- None (standalone entity)

---

### 4. Reward
**Table:** `rewards`

Tracks user achievements and points.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String(36) | PRIMARY KEY | UUID |
| user_id | String(36) | FOREIGN KEY → users.id, NOT NULL | Reward recipient |
| badge_name | String(50) | NOT NULL | Achievement name |
| points | Integer | DEFAULT 0 | Points awarded |
| awarded_at | DateTime | DEFAULT NOW | Award timestamp |

**Relationships:**
- Many-to-One with `User` (reward.user)

---

### 5. Community
**Table:** `communities`

Groups users for collaborative sustainability efforts.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String(36) | PRIMARY KEY | UUID |
| name | String(100) | NOT NULL | Community name |
| impact_score | Float | DEFAULT 0.0 | Collective impact metric |
| created_at | DateTime | DEFAULT NOW | Creation timestamp |

**Relationships:**
- Many-to-Many with `User` (via user_community table)

---

### 6. Message
**Table:** `messages`

Stores AI chatbot conversation history.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String(36) | PRIMARY KEY | UUID |
| user_id | String(36) | FOREIGN KEY → users.id, NOT NULL | Message author |
| role | String(20) | NOT NULL | 'user' or 'assistant' |
| content | Text | NOT NULL | Message text |
| timestamp | DateTime | DEFAULT NOW | Message timestamp |

**Relationships:**
- Many-to-One with `User` (message.user)

---

### 7. UserCommunity (Association Table)
**Table:** `user_community`

Many-to-many relationship between Users and Communities.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| user_id | String(36) | PRIMARY KEY, FOREIGN KEY → users.id | User reference |
| community_id | String(36) | PRIMARY KEY, FOREIGN KEY → communities.id | Community reference |
| joined_at | DateTime | DEFAULT NOW | Join timestamp |

---

## Entity Relationship Diagram

```
┌─────────────────────┐
│       User          │
│─────────────────────│
│ PK: id              │
│     name            │
│     email (unique)  │
│     password_hash   │
│     location        │
│     created_at      │
│     updated_at      │
└──────────┬──────────┘
           │
           │ 1:N
           │
    ┌──────┴──────┬─────────────┬──────────────┐
    │             │             │              │
    │             │             │              │
┌───▼────────┐ ┌──▼──────┐ ┌───▼───────┐ ┌───▼────────┐
│ WasteLog   │ │ Reward  │ │ Message   │ │user_       │
│────────────│ │─────────│ │───────────│ │community   │
│ PK: id     │ │ PK: id  │ │ PK: id    │ │────────────│
│ FK: user_id│ │FK:user_id│ │FK:user_id │ │PK:user_id  │
│waste_type  │ │badge_name│ │role       │ │PK:community│
│weight      │ │points   │ │content    │ │  _id       │
│co2_saved   │ │awarded_at│ │timestamp  │ │joined_at   │
│date        │ └─────────┘ └───────────┘ └──────┬─────┘
│status      │                                   │
│location    │                                   │ N:M
└────────────┘                                   │
                                                 │
                                          ┌──────▼──────┐
                                          │ Community   │
                                          │─────────────│
                                          │ PK: id      │
                                          │     name    │
                                          │impact_score │
                                          │ created_at  │
                                          └─────────────┘

┌──────────────────────┐
│ RecyclingCenter      │
│──────────────────────│
│ PK: id               │
│     name             │
│     location         │
│     accepted_types   │
│     latitude         │
│     longitude        │
│     facility_type    │
│     contact          │
│     operating_hours  │
│     is_active        │
└──────────────────────┘
(No relationships - standalone)
```

## Key Relationships

1. **User → WasteLog** (One-to-Many)
   - One user can have multiple waste logs
   - Each waste log belongs to one user

2. **User → Reward** (One-to-Many)
   - One user can earn multiple rewards
   - Each reward belongs to one user

3. **User → Message** (One-to-Many)
   - One user can have multiple chat messages
   - Each message belongs to one user

4. **User ↔ Community** (Many-to-Many)
   - Users can join multiple communities
   - Communities can have multiple members
   - Implemented via `user_community` association table

5. **RecyclingCenter** (Standalone)
   - No foreign key relationships
   - Queried independently for location-based searches

## Indexes

- `users.email` - Unique index for fast login lookups
- Primary keys on all tables (automatic indexing)

## Calculated Fields

### User Dashboard Statistics
Computed dynamically from relationships:
- `total_waste_recycled` = SUM(waste_logs.weight)
- `total_co2_saved` = SUM(waste_logs.co2_saved)
- `points` = (total_co2_saved × 10) + (total_waste_recycled × 5) + SUM(rewards.points)
- `total_entries` = COUNT(waste_logs)

## Database Migrations

Managed with Flask-Migrate (Alembic):
```bash
# Create migration
flask db migrate -m "description"

# Apply migration
flask db upgrade
```

## DBDiagram.io Code

To visualize this schema on dbdiagram.io, use:

```dbml
Table users {
  id varchar(36) [pk]
  name varchar(100) [not null]
  email varchar(120) [unique, not null]
  password_hash varchar(255) [not null]
  location varchar(100)
  created_at datetime [default: `now()`]
  updated_at datetime [default: `now()`]
}

Table waste_logs {
  id varchar(36) [pk]
  user_id varchar(36) [ref: > users.id, not null]
  waste_type varchar(50) [not null]
  weight float [not null]
  image_url varchar(255)
  date datetime [default: `now()`]
  co2_saved float
  disposal_method varchar(100)
  collection_location varchar(100)
  collection_status varchar(20) [default: 'pending']
  collection_date datetime
}

Table recycling_centers {
  id varchar(36) [pk]
  name varchar(100) [not null]
  location varchar(255) [not null]
  accepted_types varchar(255)
  latitude float
  longitude float
  facility_type varchar(50) [default: 'recycling']
  contact varchar(100)
  operating_hours varchar(100)
  is_active boolean [default: true]
}

Table rewards {
  id varchar(36) [pk]
  user_id varchar(36) [ref: > users.id, not null]
  badge_name varchar(50) [not null]
  points integer [default: 0]
  awarded_at datetime [default: `now()`]
}

Table communities {
  id varchar(36) [pk]
  name varchar(100) [not null]
  impact_score float [default: 0.0]
  created_at datetime [default: `now()`]
}

Table messages {
  id varchar(36) [pk]
  user_id varchar(36) [ref: > users.id, not null]
  role varchar(20) [not null]
  content text [not null]
  timestamp datetime [default: `now()`]
}

Table user_community {
  user_id varchar(36) [pk, ref: > users.id]
  community_id varchar(36) [pk, ref: > communities.id]
  joined_at datetime [default: `now()`]
}
```

## Usage Instructions

1. **Copy the DBML code above**
2. **Go to:** https://dbdiagram.io/
3. **Paste the code** in the editor
4. **Export as PNG/PDF** for documentation

---

**Database Version:** 1.0.0  
**Last Updated:** October 29, 2025
