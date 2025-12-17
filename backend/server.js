import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
 app.use(express.json());

// MongoDB Atlas Connection (use environment variable MONGO_URI)
const mongoURI = process.env.MONGO_URI || "mongodb+srv://phadtareareen:<db_password>@services.ito6x35.mongodb.net/?retryWrites=true&w=majority&appName=Services";
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB Atlas connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: { type: String, unique: true },
  password: String,
  address: String,
  city: String,
  state: String,
  country: String,
  pincode: String
});

const User = mongoose.model('User', userSchema);

// Register Route
app.post('/register', async (req, res) => {
  const {
    name,
    mobile,
    email,
    password,
    address,
    city,
    state,
    country,
    pincode
  } = req.body;

  try {
    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const newUser = new User({
      name,
      mobile,
      email,
      password: hashedPassword,
      address,
      city,
      state,
      country,
      pincode
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({
      message: 'Server error. Please try again later.',
      error: err.message,
      stack: err.stack
    });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password); 

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
      }
    });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({
      message: 'Server error. Please try again later.',
      error: err.message,
      stack: err.stack
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Ensure MONGO_URI env var is set when connecting to Atlas.');
});