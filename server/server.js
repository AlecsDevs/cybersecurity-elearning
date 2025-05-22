require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cookieParser = require('cookie-parser'); // Add this module

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Specify your frontend URL
  credentials: true // This is important for cookies to work with CORS
}));
app.use(express.json());
app.use(cookieParser()); // Add cookie parser middleware

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many login attempts, please try again later'
});

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'cybersecurity_app'
};

let pool;

async function initializeDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password
    });
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``);
    await connection.end();
    
    pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        login_attempts INT DEFAULT 0,
        locked_until DATETIME NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}

initializeDatabase();

const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secure-secret-key';

// Cookie configuration
const cookieConfig = {
  httpOnly: true, // Prevents JavaScript from reading the cookie
  secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
  sameSite: 'strict', // Prevents CSRF attacks
  maxAge: 3600000 // Cookie expiry (1 hour in milliseconds)
};

// Enhanced authentication middleware using cookies
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // Get token from cookies instead of Authorization header
  
  if (!token) return res.status(401).json({ error: 'Authentication required' });
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        res.clearCookie('token');
        return res.status(401).json({ error: 'Token expired, please login again' });
      }
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    
    // Username validation
    if (username.length < 4 || !/^[a-zA-Z0-9_]+$/.test(username)) {
      return res.status(400).json({ 
        error: 'Username must be at least 4 characters and only contain letters, numbers, and underscores' 
      });
    }
    
    // Password validation
    if (password.length < 8) {
      return res.status(400).json({ 
        error: 'Password must be at least 8 characters' 
      });
    }
    
    const [existingUser] = await pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    
    if (existingUser.length > 0) {
      return res.status(409).json({ error: 'Username already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const [result] = await pool.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );
    
    const token = jwt.sign(
      { id: result.insertId, username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    // Set token in HTTP-only cookie
    res.cookie('token', token, cookieConfig);
    
    res.status(201).json({ 
      message: 'Registration successful',
      user: { 
        id: result.insertId, 
        username 
      } 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/login', authLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    
    // Check if account is locked
    const [lockedCheck] = await pool.query(
      'SELECT locked_until FROM users WHERE username = ? AND locked_until > NOW()',
      [username]
    );
    
    if (lockedCheck.length > 0) {
      return res.status(403).json({ 
        error: `Account locked until ${lockedCheck[0].locked_until}` 
      });
    }
    
    const [users] = await pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = users[0];
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      // Increment failed login attempts
      await pool.query(
        'UPDATE users SET login_attempts = login_attempts + 1 WHERE username = ?',
        [username]
      );
      
      // Lock account after 3 failed attempts
      if (user.login_attempts + 1 >= 3) {
        const lockTime = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now
        await pool.query(
          'UPDATE users SET locked_until = ? WHERE username = ?',
          [lockTime, username]
        );
        return res.status(403).json({ 
          error: 'Account locked due to too many failed attempts. Try again in 30 minutes.' 
        });
      }
      
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Reset login attempts on successful login
    await pool.query(
      'UPDATE users SET login_attempts = 0, locked_until = NULL WHERE username = ?',
      [username]
    );
    
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    // Set token in HTTP-only cookie
    res.cookie('token', token, cookieConfig);
    
    res.json({ 
      message: 'Login successful',
      user: { 
        id: user.id, 
        username: user.username
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout route
app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

// Route to check if user is authenticated
app.get('/api/auth-check', authenticateToken, (req, res) => {
  res.json({ 
    authenticated: true, 
    user: { 
      id: req.user.id, 
      username: req.user.username 
    } 
  });
});

// Protected route example
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is protected data', user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});