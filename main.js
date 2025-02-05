// // Import required modules
// const mongoose = require('mongoose');
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('./models/Users'); // Import the User model
// const connectDb =require( "./connection.js");
// const Service=require( "./models/Service.js");


// // Initialize the app
// const app = express();

// // Middleware
// app.use(cors()); // Allow cross-origin requests
// app.use(bodyParser.json()); // Parse JSON bodies

// // Initialize database connection inside an async function
// const startServer = async () => {
//   await connectDb();

//   // Routes for your API
//   app.get('/api/services', async (req, res) => {
//     try {
//       const services = await Service.find();
//       res.json(services);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });

//   app.post('/api/services', async (req, res) => {
//     const { name, description, price, images } = req.body;

//     const newService = new Service({
//       name,
//       description,
//       price,
//       images
//     });

//     try {
//       const savedService = await newService.save();
//       res.status(201).json(savedService);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });

//   // Login route
//   app.post('/api/login', async (req, res) => {
//     const { username, password } = req.body;
//     console.log(username,password);
//     try {
//       // Find the user by username
//       const user = await User.findOne({ username });
  
//       if (!user) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//       }
  
//       // Check if the password matches the stored hash
//       const isMatch = await bcrypt.compare(password, user.password);
  
//       if (!isMatch) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//       }
  
//       // Generate JWT token
//       const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret_key', { expiresIn: '1h' });
  
//       // Check if user is an admin
//       const isAdmin = user.role === 'admin';
  
//       res.json({ token, isAdmin });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
  

//   // Register route (for creating a new user)
//   app.post('/api/register', async (req, res) => {
//     const { username, password, email,role } = req.body;

//     try {
//       // Check if the username already exists
//       const userExists = await User.findOne({ username });

//       if (userExists) {
//         return res.status(400).json({ message: 'Username already exists' });
//       }

//       // Hash the password
//       const hashedPassword = await bcrypt.hash(password, 10);

//       // Create a new user
//       const newUser = new User({
//         username,
//         email,
//         password: hashedPassword,
//         role
//       });

//       await newUser.save();
//       res.status(201).json({ message: 'User created successfully' });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
//   app.get('/home', (req, res) => {
//     res.status(200).json('Welcome, your app is working well');
//   });
//   // Set the port number for the server
//   const PORT = process.env.PORT || 5000;
//   app.get('*', (req, res) => {
//     res.status(200).send('Welcome to the main page!');
//   });
//   // Start the server
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// };

// // Start the server and connect to DB
// // startServer();
// module.exports = app;


// Import required modules
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/Users'); // Import the User model
const connectDb = require("./connection.js");
const Service = require("./models/Service.js");

// Initialize the app
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies (alternatively, you can use express.json())

// Initialize database connection inside an async function
const startServer = async () => {
  await connectDb(); // Ensure DB connection is established before handling requests

  // API endpoint to get all services
  app.get('/api/services', async (req, res) => {
    try {
      const services = await Service.find();
      res.json(services);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // API endpoint to create a new service
  app.post('/api/services', async (req, res) => {
    const { name, description, price, images } = req.body;
    const newService = new Service({
      name,
      description,
      price,
      images,
    });
    try {
      const savedService = await newService.save();
      res.status(201).json(savedService);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Login route
  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    try {
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check if the password matches the stored hash
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        'your_jwt_secret_key', // Use an environment variable in production
        { expiresIn: '1h' }
      );

      // Check if user is an admin
      const isAdmin = user.role === 'admin';
      res.json({ token, isAdmin });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // Register route (for creating a new user)
  app.post('/api/register', async (req, res) => {
    const { username, password, email, role } = req.body;
    try {
      // Check if the username already exists
      const userExists = await User.findOne({ username });
      if (userExists) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role,
      });

      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // Test endpoint
  app.get('/home', (req, res) => {
    res.status(200).json('Welcome, your app is working well');
  });

  // Catch-all route for all other requests
  app.get('/', (req, res) => {
    res.status(200).send('Welcome to the main page!');
  });
  

  // Set the port number for the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Uncomment this line if running as a traditional server:
// startServer();

// For Vercel (serverless), export the app without calling listen():
module.exports = app;
