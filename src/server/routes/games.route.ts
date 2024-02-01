import { Router } from 'express';

export const router = Router();

router.patch('/operate-gacha', (req, res) => {
  const random = Math.ceil(Math.random() * 1000);

  res.send(random <= 10);
});
