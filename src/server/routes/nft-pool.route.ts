import { NextFunction, Request, Response, Router } from 'express';
import { matchedData, param } from 'express-validator';

import { NFT_POOL_ROUTE } from '../lib/constants';
import { GachaPrize } from '../lib/dto-types';
import { checkStarsAddress } from '../middlewares/check-stars-address';
import { checkValidationResult } from '../middlewares/check-validation-result';
import { play } from '../services/nft-pool.service';

export const router = Router();

router.put(
  `${NFT_POOL_ROUTE.PLAY}/:address`,
  [
    param('address')
      .trim()
      .escape()
      .isString()
      .custom((value) => checkStarsAddress(value)),
    checkValidationResult,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: GachaPrize = await play(matchedData(req)['address']);

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);
