const express = require('express');
const router = express.Router();

/**
 * @route   GET /api/restaurants
 * @desc    Get all restaurants
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // TODO: Fetch restaurants from database
    res.json({ message: 'Restaurants list', restaurants: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
