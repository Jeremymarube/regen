# Database Diagram Generation Instructions

## 📊 How to Generate DB_Diagram.png

The `DB_Diagram.png` file referenced in the documentation needs to be generated from the DBML code in `DATABASE_SCHEMA.md`.

### Steps to Generate:

1. **Open dbdiagram.io**
   - Go to: https://dbdiagram.io/

2. **Copy DBML Code**
   - Open `DATABASE_SCHEMA.md`
   - Scroll to the "DBML Code for dbdiagram.io" section
   - Copy all the DBML code (starts with `Table users {`)

3. **Paste into Editor**
   - Paste the code into the dbdiagram.io editor
   - The diagram will automatically render

4. **Export as PNG**
   - Click "Export" button (top right)
   - Select "Export to PNG"
   - Save as `DB_Diagram.png`

5. **Save to docs folder**
   - Move the downloaded file to `/docs/DB_Diagram.png`

### Alternative: Use the ASCII Diagram

If you prefer not to generate the PNG, the `DATABASE_SCHEMA.md` file already contains:
- ASCII art ERD diagram
- Complete table definitions
- Relationship descriptions
- DBML code

### Quick Link

**DBML Code Location:** `DATABASE_SCHEMA.md` (lines 400-438)

---

**Note:** The diagram is optional for documentation purposes. All database information is already documented in text format in `DATABASE_SCHEMA.md`.
