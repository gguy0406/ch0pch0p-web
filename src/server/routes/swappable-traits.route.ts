import { NextFunction, Request, Response, Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { body, matchedData, param } from 'express-validator';

import { STMachine } from 'src/lib/types';

import { checkValidationResult } from '../middlewares/check-validation-result';
import { getMachines, getTurnCount, play, updateTokenMetadata } from '../services/swappable-traits.service';

export const router = Router();

router.get(
  '/turn-count/:address',
  [rateLimit({ windowMs: 15 * 1000, limit: 5 }), param('address').trim().escape(), checkValidationResult],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const turnCount = await getTurnCount(matchedData(req)['address']);

      res.status(200).json(turnCount);
    } catch (err) {
      next(err);
    }
  }
);

router.get('/machines', rateLimit({ windowMs: 15 * 1000, limit: 5 }), async (req, res, next) => {
  try {
    const machines = await getMachines();

    res.status(200).json(machines);
  } catch (err) {
    next(err);
  }
});

router.patch(
  '/play/:machine',
  [
    rateLimit({ windowMs: 24 * 60 * 60 * 1000, limit: 100 }),
    param('machine').isIn(Object.values(STMachine)),
    body('payFeeTx').isArray(),
    body('payFeeTx.*').isInt({ min: 0, max: 255 }),
    checkValidationResult,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await play(matchedData(req)['machine'], new Uint8Array(matchedData(req)['payFeeTx']));

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  '/level-up/:tokenId',
  [
    rateLimit({ windowMs: 24 * 60 * 60 * 1000, limit: 100 }),
    param('tokenId').toInt().isInt({ min: 1, max: 5000 }),
    body('transferTx').isArray(),
    body('transferTx.*').isInt({ min: 0, max: 255 }),
    checkValidationResult,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await updateTokenMetadata(
        matchedData(req)['tokenId'].toString(),
        new Uint8Array(matchedData(req)['transferTx'])
      );

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);
