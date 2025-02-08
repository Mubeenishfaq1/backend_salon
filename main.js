// // Import required modules
// const mongoose = require('mongoose');
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('./models/Users'); // Import the User model
// const Service = require('./models/Service.js');
// const connectDb = require('./connection.js');

// // Initialize the app
// const app = express();

// // Middleware
// app.use(cors()); // Allow cross-origin requests
// app.use(bodyParser.json()); // Parse JSON bodies

// // Initialize database connection inside an async function
// const startServer = async () => {
//   await connectDb();

//   // -------------------------------------------------
//   // SERVICE ROUTES
//   // -------------------------------------------------

//   // GET /api/services - Retrieve all services
//   app.get('/api/services', async (req, res) => {
//     try {
//       const services = await Service.find();
//       res.json(services);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });

//   // POST /api/services - Add a new service
//   // The image is saved as a URL in the DB (e.g., Cloudinary URL)
//   // Example: https://res.cloudinary.com/dtzmgrpab/image/upload/v1738182249/sofmvn2dcy4w22vwgwmy.jpg
//   app.post('/api/services', async (req, res) => {
//     const { name, description, price, images } = req.body;

//     const newService = new Service({
//       name,
//       description,
//       price,
//       images,
//     });

//     try {
//       const savedService = await newService.save();
//       // const savedService = await Service.insertMany(vaseSeed);

//       res.status(201).json(savedService);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });

//   // PUT /api/services/:id - Edit an existing service
//   app.put('/api/services/:id', async (req, res) => {
//     const { name, description, price, images } = req.body;
//     try {
//       const updatedService = await Service.findByIdAndUpdate(
//         req.params.id,
//         { name, description, price, images },
//         { new: true, runValidators: true }
//       );
//       if (!updatedService) {
//         return res.status(404).json({ message: 'Service not found' });
//       }
//       res.json(updatedService);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });

//   // DELETE /api/services/:id - Delete a service
//   app.delete('/api/services/:id', async (req, res) => {
//     try {
//       const deletedService = await Service.findByIdAndDelete(req.params.id);
//       if (!deletedService) {
//         return res.status(404).json({ message: 'Service not found' });
//       }
//       res.json({ message: 'Service deleted successfully' });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });

//   // -------------------------------------------------
//   // USER ROUTES (Login / Register)
//   // -------------------------------------------------

//   // Login route
//   app.post('/api/login', async (req, res) => {
//     const { username, password } = req.body;
//     console.log(username, password);
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
//       const token = jwt.sign(
//         { userId: user._id, role: user.role },
//         'your_jwt_secret_key', // In production, use an environment variable
//         { expiresIn: '1h' }
//       );

//       // Check if user is an admin
//       const isAdmin = user.role === 'admin';

//       res.json({ token, isAdmin });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });

//   // Register route (for creating a new user)
//   app.post('/api/register', async (req, res) => {
//     const { username, password, email, role } = req.body;

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
//         role,
//       });

//       await newUser.save();
//       res.status(201).json({ message: 'User created successfully' });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });

//   // Test route
//   app.get('/home', (req, res) => {
//     res.status(200).json('Welcome, your app is working well');
//   });

//   // Fallback route for any undefined paths
//   app.get('*', (req, res) => {
//     res.status(200).send('Welcome to the main page!');
//   });

//   // Set the port number for the server
//   const PORT = process.env.PORT || 5000;

//   // Start the server
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// };

// // Start the server and connect to DB
// startServer();

// module.exports = app;

// main.js


// Import required modules
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/Users'); // Import the User model
const Service = require('./models/Service.js');
const connectDb = require('./connection.js');

// Initialize the Express app
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies

// Connect to the database
connectDb()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

/* -------------------------------------------------
   SERVICE ROUTES
------------------------------------------------- */

// GET /api/services - Retrieve all services
app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/services - Add a new service
// The image is saved as a URL in the DB (e.g., Cloudinary URL)
// Example: https://res.cloudinary.com/dtzmgrpab/image/upload/v1738182249/sofmvn2dcy4w22vwgwmy.jpg
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

// PUT /api/services/:id - Edit an existing service
app.put('/api/services/:id', async (req, res) => {
  const { name, description, price, images } = req.body;
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { name, description, price, images },
      { new: true, runValidators: true }
    );
    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(updatedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/services/:id - Delete a service
app.delete('/api/services/:id', async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* -------------------------------------------------
   USER ROUTES (Login / Register)
------------------------------------------------- */

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
      'your_jwt_secret_key', // In production, use an environment variable
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

// Test route
app.get('/home', (req, res) => {
  res.status(200).json('Welcome, your app is working well');
});

// Fallback route for any undefined paths
app.get('*', (req, res) => {
  res.status(200).send('Welcome to the main page!');
});

/* -------------------------------------------------
   Vercel Serverless Export
------------------------------------------------- */

// Do not call app.listen() in Vercel—export the app instead.
module.exports = app;
