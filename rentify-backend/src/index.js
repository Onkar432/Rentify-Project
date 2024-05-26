const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
// Import routes
const buyerAuthRoutes = require('./routes/authRoutes');
const sellerAuthRoutes = require('./routes/sellerAuthRoutes');
const sellerPropertyRoutes = require('./routes/sellerPropertyRoutes');
const buyerPropertyRoutes = require('./routes/buyerPropertyRoutes');


// Use authentication routes
app.use('/api/auth-buyer', buyerAuthRoutes);
app.use('/api/auth-seller', sellerAuthRoutes);
app.use('/api/seller', sellerPropertyRoutes);
app.use('/api/buyer', buyerPropertyRoutes);

// Middleware for error handling (if any)

require('dotenv').config()
const connectDatabase = require('./config/database');


process.on('uncaughtException', (err) => {
    console.log('Error:', err.message);
    console.log('Shutting down the server due to uncaughtException')
    process.exit(1);

})
connectDatabase();
// console.log(Youtube)
const PORT = process.env.PORT || 3000;
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});

module.exports = app;
