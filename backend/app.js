const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs');
const path = require('path');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

// Serve static files from the React frontend app
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('frontend/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'));
    });
  }

// Server
const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('listening to port:', PORT);
    })
}

server();