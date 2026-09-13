# Services Layer — Basic CRUD Task

## Objective

The `services` folder contains the **business/service layer** of the application.

The service layer is responsible for:

- Importing database queries
- Connecting to the database
- Passing values to parameterized SQL queries
- Validating required inputs
- Returning database results
- Providing functions that can later be used by Controllers

You already have existing service files that can be used as your reference.

---

# Existing Service Files

Currently, the `services` folder contains:

```text
services/
├── accounts-service.js
├── auth-service.js
├── grade-n-strands-service.js
├── grade-sections-service.js
├── role-service.js
├── school-years-service.js
└── staff-service.js
```

These existing files demonstrate how the **Service Layer** communicates with the **Query Layer**.

---

# Your Task

You previously created the missing query files.

Now you must create the corresponding **service files** for those database tables.

Create the following:

```text
attendance-reports-service.js
board-games-service.js
library-computer-usages-service.js
library-computers-service.js
library-staff-duties-service.js
students-service.js
visitors-service.js
```

---

# Required Service Files

| Query File                         | Service File                         |
| ---------------------------------- | ------------------------------------ |
| `attendance_reports-query.js`      | `attendance-reports-service.js`      |
| `board_games-query.js`             | `board-games-service.js`             |
| `library_computer_usages-query.js` | `library-computer-usages-service.js` |
| `library_computers-query.js`       | `library-computers-service.js`       |
| `library_staff_duties-query.js`    | `library-staff-duties-service.js`    |
| `students-query.js`                | `students-service.js`                |
| `visitors-query.js`                | `visitors-service.js`                |

---

# Service Layer Flow

Your service should follow this flow:

```text
Controller
    │
    │ calls service function
    ▼
Service
    │
    │ validates input
    │ executes query
    ▼
Query File
    │
    │ contains SQL
    ▼
Database
    │
    │ returns result
    ▼
Service
    │
    ▼
Controller
```

The **service file should NOT contain large SQL statements**.

SQL belongs in the `queries` folder.

---

# Reference: accounts-service.js

Use the existing `accounts-service.js` as your main reference.

The basic structure is:

```javascript
const db = require("../config/database.js");

const {
  CREATE_ACCOUNT,
  FIND_ALL_ACCOUNTS,
  FIND_ACCOUNT_BY_ID,
  FIND_ACCOUNT_BY_USERNAME,
  UPDATE_ACCOUNT,
  DELETE_ACCOUNT,
} = require("../database/queries/accounts-query.js");
```

The service imports:

1. The database connection
2. The required SQL query constants

---

# Required CRUD Functions

For each service file, create functions for:

```text
CREATE
READ - Get All
READ - Get By ID
UPDATE
DELETE
```

Your service should correspond to the CRUD queries you created in the previous task.

---

# 1. CREATE Service

Example:

```javascript
const createBoardGame = async (name, quantity) => {
  if (!name || !quantity) {
    throw new Error("Board game name and quantity are required.");
  }

  const [result] = await db.query(CREATE_BOARD_GAME, [name, quantity]);

  return result;
};
```

The service:

1. Receives values
2. Validates the values
3. Executes the query
4. Passes values using an array
5. Returns the database result

---

# 2. READ — Get All

Example:

```javascript
const findAllBoardGames = async () => {
  const [rows] = await db.query(FIND_ALL_BOARD_GAMES);

  return rows;
};
```

Since there are no input parameters, you do not need to provide a second argument to `db.query()`.

---

# 3. READ — Get By ID

Example:

```javascript
const findBoardGameById = async (id) => {
  if (!id) {
    throw new Error("Board game ID is required.");
  }

  const [rows] = await db.query(FIND_BOARD_GAME_BY_ID, [id]);

  return rows[0] || null;
};
```

The service:

- Checks whether the ID was provided
- Sends the ID to the query
- Returns the first matching record
- Returns `null` if no record was found

---

# 4. UPDATE Service

Example:

```javascript
const updateBoardGame = async (id, name, quantity) => {
  if (!id || !name || !quantity) {
    throw new Error("Board game ID, name, and quantity are required.");
  }

  const [result] = await db.query(UPDATE_BOARD_GAME, [name, quantity, id]);

  return result;
};
```

### Important

The order of the values in the array must match the order of the `?` placeholders in your SQL query.

For example, if your query is:

```sql
UPDATE board_games
SET
  name = ?,
  quantity = ?
WHERE id = ?
```

Then your service must use:

```javascript
[name, quantity, id];
```

---

# 5. DELETE Service

Example:

```javascript
const deleteBoardGame = async (id) => {
  if (!id) {
    throw new Error("Board game ID is required.");
  }

  const [result] = await db.query(DELETE_BOARD_GAME, [id]);

  return result;
};
```

---

# Export Your Service Functions

At the bottom of every service file, export the functions.

Example:

```javascript
module.exports = {
  createBoardGame,
  findAllBoardGames,
  findBoardGameById,
  updateBoardGame,
  deleteBoardGame,
};
```

The Controller will later import these functions.

---

# Complete Service Template

Use this as your starting template.

```javascript
const db = require("../config/database.js");

const {
  CREATE_TABLE_NAME,
  FIND_ALL_TABLE_NAME,
  FIND_TABLE_NAME_BY_ID,
  UPDATE_TABLE_NAME,
  DELETE_TABLE_NAME,
} = require("../database/queries/table-name-query.js");

// CREATE
const createTableName = async (/* parameters */) => {
  // Validate required values
  // Execute CREATE query
  // Return result
};

// READ - Get all records
const findAllTableNames = async () => {
  // Execute FIND ALL query
  // Return rows
};

// READ - Get record by ID
const findTableNameById = async (id) => {
  // Validate ID
  // Execute FIND BY ID query
  // Return first row or null
};

// UPDATE
const updateTableName = async (id /* other parameters */) => {
  // Validate required values
  // Execute UPDATE query
  // Return result
};

// DELETE
const deleteTableName = async (id) => {
  // Validate ID
  // Execute DELETE query
  // Return result
};

module.exports = {
  createTableName,
  findAllTableNames,
  findTableNameById,
  updateTableName,
  deleteTableName,
};
```

Replace the placeholder names with the actual table and field names.

---

# Important: Check Your Query File First

Before creating a service, open the corresponding query file.

For example:

```text
database/
├── queries/
│   └── board_games-query.js
│
└── schemas/
    └── board_games.sql
```

Your service must use the exact query constants exported by the query file.

For example, if the query file contains:

```javascript
const CREATE_BOARD_GAME = `...`;

const FIND_ALL_BOARD_GAMES = `...`;

const FIND_BOARD_GAME_BY_ID = `...`;

const UPDATE_BOARD_GAME = `...`;

const DELETE_BOARD_GAME = `...`;

module.exports = {
  CREATE_BOARD_GAME,
  FIND_ALL_BOARD_GAMES,
  FIND_BOARD_GAME_BY_ID,
  UPDATE_BOARD_GAME,
  DELETE_BOARD_GAME,
};
```

Then the service should import those exact names:

```javascript
const {
  CREATE_BOARD_GAME,
  FIND_ALL_BOARD_GAMES,
  FIND_BOARD_GAME_BY_ID,
  UPDATE_BOARD_GAME,
  DELETE_BOARD_GAME,
} = require("../database/queries/board_games-query.js");
```

---

# Input Validation

The service layer should perform basic validation before sending data to the database.

Example:

```javascript
if (!id) {
  throw new Error("Student ID is required.");
}
```

For multiple required values:

```javascript
if (!firstName || !lastName) {
  throw new Error("First name and last name are required.");
}
```

The exact validation depends on the columns and requirements of your table.

---

# Do Not Guess the Columns

Do not copy the parameters from `accounts-service.js` and simply rename the function.

For every service:

```text
1. Open the schema
       ↓
2. Identify the table columns
       ↓
3. Open the query file
       ↓
4. Check the query parameters
       ↓
5. Create the service functions
       ↓
6. Match the parameter order
```

For example:

```sql
UPDATE students
SET
  first_name = ?,
  last_name = ?,
  grade_level = ?
WHERE id = ?
```

The service must pass:

```javascript
[firstName, lastName, gradeLevel, id];
```

The order matters.

---

# Expected Folder Structure

After completing the task:

```text
services/
├── accounts-service.js
├── attendance-reports-service.js       ← NEW
├── auth-service.js
├── board-games-service.js              ← NEW
├── grade-n-strands-service.js
├── grade-sections-service.js
├── library-computer-usages-service.js  ← NEW
├── library-computers-service.js        ← NEW
├── library-staff-duties-service.js     ← NEW
├── role-service.js
├── school-years-service.js
├── staff-service.js
├── students-service.js                 ← NEW
└── visitors-service.js                 ← NEW
```

---

# Query + Service Relationship

Each missing table should now have both a **Query File** and a **Service File**.

```text
attendance_reports.sql
        │
        ▼
attendance_reports-query.js
        │
        ▼
attendance-reports-service.js
```

```text
board_games.sql
        │
        ▼
board_games-query.js
        │
        ▼
board-games-service.js
```

```text
library_computer_usages.sql
        │
        ▼
library_computer_usages-query.js
        │
        ▼
library-computer-usages-service.js
```

```text
library_computers.sql
        │
        ▼
library_computers-query.js
        │
        ▼
library-computers-service.js
```

```text
library_staff_duties.sql
        │
        ▼
library_staff_duties-query.js
        │
        ▼
library-staff-duties-service.js
```

```text
students.sql
        │
        ▼
students-query.js
        │
        ▼
students-service.js
```

```text
visitors.sql
        │
        ▼
visitors-query.js
        │
        ▼
visitors-service.js
```

---

# Final Architecture

After completing both tasks, the database portion of your application should follow this structure:

```text
schemas/
    │
    │  Database Structure
    ▼
queries/
    │
    │  SQL Statements
    ▼
services/
    │
    │  Database Operations
    ▼
controllers/
    │
    │  Request/Response Handling
    ▼
routes/
    │
    │  API Endpoints
    ▼
Frontend
```

Each layer has a specific responsibility.

### Schema

Defines the database tables.

```text
What does the database look like?
```

### Query

Contains SQL statements.

```text
What SQL should be executed?
```

### Service

Executes queries and handles basic validation.

```text
How should the application perform this database operation?
```

### Controller

Handles HTTP requests and responses.

```text
What should happen when the client sends a request?
```

### Route

Defines the API endpoint.

```text
Which URL and HTTP method should trigger the controller?
```

---

# Completion Checklist

## Service Files

```text
[ ] attendance-reports-service.js
[ ] board-games-service.js
[ ] library-computer-usages-service.js
[ ] library-computers-service.js
[ ] library-staff-duties-service.js
[ ] students-service.js
[ ] visitors-service.js
```

## For Each Service

```text
[ ] Database connection imported
[ ] Correct query file imported
[ ] CREATE service function
[ ] FIND ALL service function
[ ] FIND BY ID service function
[ ] UPDATE service function
[ ] DELETE service function
[ ] Required input validation
[ ] Correct parameter order
[ ] Database result returned
[ ] Functions exported using module.exports
```

## Final Check

Make sure that:

```text
Schema
   ↓
Query
   ↓
Service
```

are correctly connected.

Do not write SQL directly inside the service file.

**The Query Layer owns the SQL.**

**The Service Layer owns the database operation and basic validation.**
