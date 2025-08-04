const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sharp = require('sharp');
const cors = require('cors');
const { extractDominantColor, isAcceptable, getSuggestedColors } = require('./utils/colorUtils');
const User = require('./models/User');
require('dotenv').config();

const app = express();
const upload = multer();

mongoose.connect(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await User.create({ email, password: hash });
  res.sendStatus(201);
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) return res.sendStatus(401);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

app.post('/api/image', upload.single('image'), async (req, res) => {
  const buffer = req.file.buffer;
  const extractedColor = await extractDominantColor(buffer);

  if (isAcceptable(extractedColor)) {
    res.json({ extractedColor, status: 'Acceptable' });
  } else {
    const suggestedColors = await getSuggestedColors();
    res.json({ extractedColor, status: 'Not acceptable', suggestedColors });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));