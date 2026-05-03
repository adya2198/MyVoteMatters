const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const whatsappRoutes = require('./routes/whatsappRoutes');

// Load env variables
dotenv.config();

const app = express();

// Security Middlewares
app.use(helmet()); // Adds various HTTP headers for security

// Rate limiting to prevent brute-force/DDoS
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', apiLimiter);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Twilio sends URL-encoded data

// Routes
app.use('/api/whatsapp', whatsappRoutes);

app.get('/', (req, res) => {
  res.send('VoteSathi Backend is running! 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
