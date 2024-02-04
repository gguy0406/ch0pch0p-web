import { NextFunction, Request, Response, Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { body, param } from 'express-validator';

import { Machine } from 'src/lib/types';

import { checkValidationResult } from '../middlewares/check-validation-result';
import { getTurnCount, play } from '../services/swappable-traits.service';

export const router = Router();

router.get(
  '/turn-count/:address',
  rateLimit({ windowMs: 15 * 1000, limit: 5 }),
  param('address').trim().escape(),
  checkValidationResult,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const turnCount = await getTurnCount(req.params['address']);

      res.status(200).json(turnCount);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  '/play/:machine',
  rateLimit({ windowMs: 24 * 60 * 60 * 1000, limit: 100 }),
  param('machine').isIn(Object.values(Machine)),
  body('payFeeTx').isArray(),
  body('payFeeTx.*').isInt({ min: 0, max: 255 }),
  checkValidationResult,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await play(req.params['machine'] as Machine, new Uint8Array(req.body.payFeeTx));

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);
