const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const whatsappRoutes = require('./routes/whatsappRoutes');

// Load env variables
dotenv.config();

const app = express();

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
