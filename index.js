const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');

const app = express();
const PORT = 5001;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');  // Using EJS as template engine

// MongoDB Connection
mongoose.connect('mongodb+srv://user1:Welcome1@clusterscl.rrlr6.mongodb.net/?retryWrites=true&w=majority&appName=ClusterSCL', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

// Routes
app.get('/', (req, res) => {
  res.render('signup');
});

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Create a new user instance
    const newUser = new User({ username, email, password });
    // Save the new user
    await newUser.save();

    // Redirect to personalized session page
    res.redirect(`/profile/${newUser._id}`);
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(400).send('Unable to save user.');
  }
});

app.get('/profile/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Render profile page with user data
    res.render('profile', { user });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).send('Error fetching user.');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
