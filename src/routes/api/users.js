const express = require('express');
const router = express.Router();

// @route           GET api/users
// @description     TEST ROUTE
// @access          PUBLIC

router.get('/', async (req, res) => {
   try {
      res.json('Hello users');
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
});

module.exports = router;
