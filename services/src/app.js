const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const app = express();

// ============================================================
// PROJECT PATH
// ============================================================
//
// Current file:
//
// project/
// └── services/
//     └── src/
//         └── app.js
//
// Frontend:
//
// project/
// ├── index.html
// ├── assets/
// ├── auth/
// └── pages/
//
// Since this file is located inside:
//
// services/src/
//
// we need to go two levels up:
//
// ../..
//
// This gives us the project root.
//

const PROJECT_ROOT = path.join(__dirname, '../..');

// ============================================================
// MIDDLEWARE
// ============================================================

// ------------------------------------------------------------
// Security Headers
// ------------------------------------------------------------
//
// Helmet adds several HTTP security headers to responses.
//

app.use(helmet());

// ------------------------------------------------------------
// CORS
// ------------------------------------------------------------
//
// CORS allows frontend applications to communicate with
// backend services when they are running on different origins.
//

app.use(cors());

// ------------------------------------------------------------
// JSON Parser
// ------------------------------------------------------------
//
// Allows Express to read JSON data sent by clients.
//

app.use(express.json());

// ------------------------------------------------------------
// Form Data Parser
// ------------------------------------------------------------
//
// Allows Express to read data submitted through forms.
//

app.use(express.urlencoded({ extended: true }));

// ------------------------------------------------------------
// HTTP Request Logger
// ------------------------------------------------------------
//
// Morgan displays HTTP requests in the terminal.
//
// Example:
//
// GET /
// GET /assets/css/style.css
// GET /api/health
//

app.use(morgan('dev'));

// ============================================================
// SERVE FRONTEND
// ============================================================
//
// Express will serve the frontend from the project root.
//
// This means:
//
// http://localhost:3000/
//      ↓
// index.html
//
// http://localhost:3000/assets/css/style.css
//      ↓
// assets/css/style.css
//
// http://localhost:3000/assets/js/main.js
//      ↓
// assets/js/main.js
//
// http://localhost:3000/auth/sign-in.html
//      ↓
// auth/sign-in.html
//
// http://localhost:3000/pages/example.html
//      ↓
// pages/example.html
//

app.use(express.static(PROJECT_ROOT));

// ============================================================
// SERVE UPLOADED FILES
// ============================================================
//
// Uploaded files will be stored inside:
//
// services/uploads/
//
// They can be accessed through:
//
// http://localhost:3000/uploads/filename.jpg
//

app.use(
    '/uploads',
    express.static(path.join(__dirname, '../uploads'))
);

// ============================================================
// API HEALTH CHECK
// ============================================================
//
// This route checks whether the backend is running.
//
// URL:
//
// http://localhost:3000/api/health
//

app.get('/api/health', (req, res) => {

    res.status(200).json({

        success: true,
        service: 'backend',
        status: 'online'

    });

});

// ============================================================
// HOME PAGE
// ============================================================
//
// When a user visits:
//
// http://localhost:3000/
//
// Express sends the project's index.html.
//

app.get('/', (req, res) => {

    res.sendFile(
        path.join(PROJECT_ROOT, 'index.html')
    );

});

// ============================================================
// EXPORT APP
// ============================================================

module.exports = app;
