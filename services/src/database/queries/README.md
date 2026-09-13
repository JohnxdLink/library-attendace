# Database Query Files — Basic CRUD Task

## Objective

Some database schemas currently **do not have a corresponding query file**.

Your task is to create the missing query files and implement the **Basic CRUD SQL queries** for each one.

Follow the same structure and coding style used in the existing query files, such as `accounts-query.js`.

---

# Missing Query Files

The following database schemas currently **do not have query files**:

```text
attendance_reports.sql
board_games.sql
library_computer_usages.sql
library_computers.sql
library_staff_duties.sql
students.sql
visitors.sql
```

Therefore, you need to create:

```text
attendance_reports-query.js
board_games-query.js
library_computer_usages-query.js
library_computers-query.js
library_staff_duties-query.js
students-query.js
visitors-query.js
```

---

# Your Task

For **each missing query file**, create the Basic CRUD queries:

```text
CREATE
READ - Get All
READ - Get By ID
UPDATE
DELETE
```

Your query file should contain SQL constants and export them using `module.exports`.

---

# Required Query Structure

Each query file should follow this general structure:

```javascript
// CREATE
const CREATE_TABLE_NAME = `
  INSERT INTO table_name (column1, column2)
  VALUES (?, ?)
`;

// READ - Get all records
const FIND_ALL_TABLE_NAME = `
  SELECT
    t.id,
    t.column1,
    t.column2,
    t.created_at,
    t.updated_at
  FROM table_name AS t
  ORDER BY t.id DESC
`;

// READ - Get record by ID
const FIND_TABLE_NAME_BY_ID = `
  SELECT
    t.id,
    t.column1,
    t.column2,
    t.created_at,
    t.updated_at
  FROM table_name AS t
  WHERE t.id = ?
`;

// UPDATE
const UPDATE_TABLE_NAME = `
  UPDATE table_name AS t
  SET
    t.column1 = ?,
    t.column2 = ?
  WHERE t.id = ?
`;

// DELETE
const DELETE_TABLE_NAME = `
  DELETE FROM table_name
  WHERE id = ?
`;

module.exports = {
  CREATE_TABLE_NAME,
  FIND_ALL_TABLE_NAME,
  FIND_TABLE_NAME_BY_ID,
  UPDATE_TABLE_NAME,
  DELETE_TABLE_NAME,
};
```

> **Important:** The example above is only a template. You must replace `table_name`, `column1`, `column2`, etc. with the **actual table and column names from your `.sql` schema file**.

---

# CRUD Requirements

## 1. CREATE

The `CREATE` query must insert a new record into the table.

Example:

```javascript
const CREATE_BOARD_GAME = `
  INSERT INTO board_games (name, quantity)
  VALUES (?, ?)
`;
```

Use `?` placeholders for values.

Do **not** directly insert values into the SQL string.

---

## 2. READ — Get All

Create a query that retrieves all records.

Example:

```javascript
const FIND_ALL_BOARD_GAMES = `
  SELECT
    bg.id,
    bg.name,
    bg.quantity,
    bg.created_at,
    bg.updated_at
  FROM board_games AS bg
  ORDER BY bg.id DESC
`;
```

Use a table alias when appropriate.

For example:

```sql
FROM board_games AS bg
```

---

## 3. READ — Get By ID

Create a query that retrieves one record using its primary key.

Example:

```javascript
const FIND_BOARD_GAME_BY_ID = `
  SELECT
    bg.id,
    bg.name,
    bg.quantity,
    bg.created_at,
    bg.updated_at
  FROM board_games AS bg
  WHERE bg.id = ?
`;
```

The `?` represents the ID that will be supplied by the service layer.

---

## 4. UPDATE

Create a query that updates an existing record.

Example:

```javascript
const UPDATE_BOARD_GAME = `
  UPDATE board_games AS bg
  SET
    bg.name = ?,
    bg.quantity = ?
  WHERE bg.id = ?
`;
```

The last `?` should normally represent the record's ID.

---

## 5. DELETE

Create a query that deletes a record using its ID.

Example:

```javascript
const DELETE_BOARD_GAME = `
  DELETE FROM board_games
  WHERE id = ?
`;
```

---

# Export Your Queries

All query constants must be exported.

Example:

```javascript
module.exports = {
  CREATE_BOARD_GAME,
  FIND_ALL_BOARD_GAMES,
  FIND_BOARD_GAME_BY_ID,
  UPDATE_BOARD_GAME,
  DELETE_BOARD_GAME,
};
```

This allows the **service layer** to import and use your SQL queries.

---

# Important: Check the Schema First

Before writing your query file, open the corresponding `.sql` file.

For example:

```text
schemas/
└── board_games.sql
```

Then identify:

1. Table name
2. Primary key
3. Column names
4. Required columns
5. Nullable columns
6. Foreign keys
7. `created_at` / `updated_at` columns, if available

Do **not** assume that every table has the same columns.

For example, this:

```sql
INSERT INTO board_games (name, quantity)
VALUES (?, ?)
```

is only correct if `board_games.sql` actually contains:

```text
name
quantity
```

---

# Files to Complete

## 1. `attendance_reports-query.js`

Source schema:

```text
schemas/attendance_reports.sql
```

Required:

```text
CREATE
FIND ALL
FIND BY ID
UPDATE
DELETE
```

---

## 2. `board_games-query.js`

Source schema:

```text
schemas/board_games.sql
```

Required:

```text
CREATE
FIND ALL
FIND BY ID
UPDATE
DELETE
```

---

## 3. `library_computer_usages-query.js`

Source schema:

```text
schemas/library_computer_usages.sql
```

Required:

```text
CREATE
FIND ALL
FIND BY ID
UPDATE
DELETE
```

---

## 4. `library_computers-query.js`

Source schema:

```text
schemas/library_computers.sql
```

Required:

```text
CREATE
FIND ALL
FIND BY ID
UPDATE
DELETE
```

---

## 5. `library_staff_duties-query.js`

Source schema:

```text
schemas/library_staff_duties.sql
```

Required:

```text
CREATE
FIND ALL
FIND BY ID
UPDATE
DELETE
```

---

## 6. `students-query.js`

Source schema:

```text
schemas/students.sql
```

Required:

```text
CREATE
FIND ALL
FIND BY ID
UPDATE
DELETE
```

---

## 7. `visitors-query.js`

Source schema:

```text
schemas/visitors.sql
```

Required:

```text
CREATE
FIND ALL
FIND BY ID
UPDATE
DELETE
```

---

# Expected Folder Structure

After completing the task, your folder should look like this:

```text
queries/
├── accounts-query.js
├── attendance_reports-query.js       ← NEW
├── auth-query.js
├── board_games-query.js              ← NEW
├── grade_n_strands-query.js
├── grade_sections-query.js
├── library_computer_usages-query.js  ← NEW
├── library_computers-query.js        ← NEW
├── library_staff_duties-query.js     ← NEW
├── role-query.js
├── school_years-query.js
├── staff-query.js
├── students-query.js                 ← NEW
└── visitors-query.js                  ← NEW
```

---

# Coding Rules

### 1. Use parameterized queries

Correct:

```javascript
WHERE id = ?
```

Do not do:

```javascript
WHERE id = ${id}
```

The `?` placeholders help prevent SQL injection and allow the database driver to safely provide the values.

---

### 2. Use descriptive constant names

Use:

```javascript
CREATE_STUDENT;
FIND_ALL_STUDENTS;
FIND_STUDENT_BY_ID;
UPDATE_STUDENT;
DELETE_STUDENT;
```

Avoid unclear names such as:

```javascript
CREATE1;
GETDATA;
QUERY2;
SQL;
```

---

### 3. Use table aliases consistently

Example:

```sql
FROM students AS s
```

Then use the alias:

```sql
SELECT
  s.id,
  s.first_name,
  s.last_name
```

---

### 4. Do not modify the schema

This task is about creating **query files**.

Do not change the `.sql` schema files unless your teacher specifically instructs you to do so.

---

# Authentication Query

You may notice that there is:

```text
auth-query.js
```

but there is no:

```text
auth.sql
```

This is **not considered a missing query file**.

Authentication queries can use existing tables such as:

```text
accounts
roles
```

Therefore, you do not need to create an `auth.sql` file for this task.

---

# Completion Checklist

Before submitting your work, make sure:

```text
[ ] attendance_reports-query.js created
[ ] board_games-query.js created
[ ] library_computer_usages-query.js created
[ ] library_computers-query.js created
[ ] library_staff_duties-query.js created
[ ] students-query.js created
[ ] visitors-query.js created
```

For **each file**:

```text
[ ] CREATE query
[ ] FIND ALL query
[ ] FIND BY ID query
[ ] UPDATE query
[ ] DELETE query
[ ] module.exports
[ ] Correct table name
[ ] Correct column names
[ ] Correct primary key
[ ] Parameterized queries using ?
```

---

# Final Goal

The goal is to make sure that every database table that requires CRUD operations has its own query file.

The expected architecture is:

```text
SQL Schema
    │
    ▼
Query File
    │
    ▼
Service Layer
    │
    ▼
Controller
    │
    ▼
Route
    │
    ▼
Client / Frontend
```

Your responsibility in this activity is the **Query File** layer.

**Do not copy the `accounts-query.js` blindly.** Use it as the coding pattern, but inspect the corresponding `.sql` schema and write the queries according to the actual structure of each table.
