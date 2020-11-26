import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
   try {
      res.send('User Route!!');
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
});

export default router;
