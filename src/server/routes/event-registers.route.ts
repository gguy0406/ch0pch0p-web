import { NextFunction, Request, Response, Router } from 'express';
import { body, matchedData } from 'express-validator';

import { EventRegister, Ticket } from '../lib/types';
import { checkValidationResult } from '../middlewares/check-validation-result';
import { register } from '../services/event-registers.service';

export const router = Router();

router.post(
  '/register',
  [
    body('email').isEmail().isLength({ max: 255 }),
    body('ticket').isIn(Object.values(Ticket)),
    body('transactionHash').isString().isLength({ max: 255 }),
    body('name').optional().isString().isLength({ max: 255 }),
    body('communityGang').optional().isString().isLength({ max: 255 }),
    body('walletId').optional().isString().isLength({ max: 255 }),
    checkValidationResult,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await register(matchedData(req) as EventRegister);

      res.status(200).json();
    } catch (err) {
      next(err);
    }
  }
);
