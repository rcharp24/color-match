// server.js or routes/color.js
const express = require('express');
const multer = require('multer');
const getColors = require('./utils/getColors'); // e.g. color-thief
const matchColors = require('./utils/matchColors'); // your logic
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const colors = await getColors(req.file.path); // dominant hex codes
    const results = matchColors(colors); // acceptable? suggest alt?
    res.json({ extracted: colors, match: results });
  } catch (err) {
    res.status(500).json({ error: 'Image processing failed.' });
  }
});

module.exports = router;
