// server.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';

dotenv.config();

const app = express();

// 🛠 Connect to MongoDB
await connectDB();

// 🌐 Global Middleware
app.use(cors());

// 🔔 Webhook Route — must use raw body for Svix signature verification
const rawJson = express.raw({ type: 'application/json' });
app.post('/clerk', rawJson, clerkWebhooks);

// 🏠 Health Check Endpoint
app.get('/', (req, res) => res.send("API working"));

// ⚠️ Catch-All for Undefined Routes
app.use((req, res) => {
  res.status(404).send("Route not found");
});

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
