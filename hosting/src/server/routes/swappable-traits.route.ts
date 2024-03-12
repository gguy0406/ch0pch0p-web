import { NextFunction, Request, Response, Router } from 'express';
import { body, matchedData, param } from 'express-validator';

import { SWAPPABLE_TRAITS_ROUTE } from '../lib/constants';
import { STMachine } from '../lib/types';
import { checkValidationResult } from '../middlewares/check-validation-result';
import { play, updateTokenMetadata } from '../services/swappable-traits.service';

export const router = Router();

router.put(
  `${SWAPPABLE_TRAITS_ROUTE.PLAY}/:machine`,
  [
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

router.put(
  `${SWAPPABLE_TRAITS_ROUTE.LEVEL_UP}}/:tokenId`,
  [
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
