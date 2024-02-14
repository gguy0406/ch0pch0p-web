import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';

import { logger } from '../utils/logger';

export function checkValidationResult(req: Request, _res: Response, next: NextFunction) {
  const result = validationResult(req);

  if (result.isEmpty()) {
    next();
    return;
  }

  result.array().map((err) => {
    if (err.type === 'field') logger.error(`${err.msg} - [${err.path}]: ${err.value}`);
    else logger.error(err.msg);
  });

  next(createHttpError(400));
}
