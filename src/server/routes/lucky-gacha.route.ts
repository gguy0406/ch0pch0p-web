import { NextFunction, Request, Response, Router } from 'express';
import { matchedData, param } from 'express-validator';

import { LUCKY_GACHA_ROUTE } from '../lib/constants';
import { Machine } from '../lib/dto-types';
import { checkValidationResult } from '../middlewares/check-validation-result';
import { getMachines, getTurnCount } from '../services/lucky-gacha.service';
import { checkStarsAddress } from 'server/middlewares/check-stars-address';

export const router = Router();

router.get(LUCKY_GACHA_ROUTE.MACHINES, async (req, res, next) => {
  try {
    const machines: Machine[] = await getMachines();

    res.status(200).json(machines);
  } catch (err) {
    next(err);
  }
});

router.get(
  `${LUCKY_GACHA_ROUTE.TURN_COUNT}/:address`,
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
      const turnCount = await getTurnCount(matchedData(req)['address']);

      res.status(200).json(turnCount);
    } catch (err) {
      next(err);
    }
  }
);
