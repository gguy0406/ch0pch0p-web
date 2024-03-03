import { NextFunction, Request, Response, Router } from 'express';
import { ValidationChain, body, matchedData } from 'express-validator';

import { EventRegister, Ticket } from '../lib/types';
import { checkValidationResult } from '../middlewares/check-validation-result';
import { register } from '../services/event-registers.service';

export const router = Router();

const normalStringValidation = (chain: ValidationChain) => chain.isString().isLength({ max: 255 });

router.post(
  '/register',
  [
    body('email').isEmail().isLength({ max: 255 }),
    body('ticket')
      .isIn(Object.values(Ticket))
      .customSanitizer((value) => Ticket[value]),
    normalStringValidation(body('name').optional()),
    normalStringValidation(body('communityGang').optional()),
    async (req: Request, res: Response, next: NextFunction) => {
      const { ticket } = matchedData(req);

      if (ticket === Ticket.CH0PPERS) {
        await normalStringValidation(body('walletId')).run(req);
        await normalStringValidation(body('transactionHash').optional()).run(req);
      } else {
        await normalStringValidation(body('walletId').optional()).run(req);
        await normalStringValidation(body('transactionHash')).run(req);
      }

      next();
    },
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
