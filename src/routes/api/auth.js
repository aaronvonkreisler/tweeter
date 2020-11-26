const express = require('express');
const router = express.Router();

// @route           GET api/auth
// @description     TEST ROUTE
// @access          PUBLIC

router.get('/', async (req, res) => {
   try {
      res.json('Hello auth');
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
});

router.post('/', (req, res) => {
   try {
      console.log(req.body);
      res.json({ msg: 'yay!' });
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
});

module.exports = router;
