const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


// Connect to MongoDB
mongoose.connect('mongodb+srv://${USERNAME}:${PASSWORD}@cluster0-portfolio.mkzhw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0-portfolio', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    totalPoints: { type: Number, default: 0 },
    claimHistory: [{ date: Date, points: Number }]
});

const User = mongoose.model('User', userSchema);


const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000'
  }));

// API endpoints
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.post('/claim-points', async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const randomPoints = Math.floor(Math.random() * 10) + 1;
        user.totalPoints += randomPoints;
        user.claimHistory.push({ date: new Date(), points: randomPoints });
        await user.save();

        res.json({ message: 'Points claimed successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to claim points' });
    }
});

app.get('/leaderboard', async (req, res) => {
    try {
      const leaderboard = await User.find().sort({ totalPoints: -1 });
      res.json(leaderboard);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
  });
  
  app.get('/user-history', async (req, res) => {
    try {
      const userHistory = await User.find().select('claimHistory');
      res.json(userHistory);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch user history' });
    }
  });

  app.post('/add-user', async (req, res) => {
    try {
      const { name } = req.body;
  
      const newUser = new User({
        userId: generateUniqueId(),
        name,
        totalPoints: 0,
        claimHistory: []
      });
  
      await newUser.save();
  
      res.json({ message: 'User added successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to add user' });
    }
  });

  function generateUniqueId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
  }

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
