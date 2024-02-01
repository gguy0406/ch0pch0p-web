import express, { NextFunction, Request, Response, Router } from 'express';
import createHttpError, { HttpError } from 'http-errors';

import { httpLogger } from '../middlewares/http-logger';
import { limiter } from '../middlewares/limiter';
import { logger } from '../utils/logger';
import { router as gameRouter } from './games.route';

export const apiRouter = Router();

apiRouter.use(express.urlencoded({ extended: false }));
apiRouter.use(express.json());
apiRouter.use(httpLogger);
apiRouter.use('/games', [limiter, gameRouter]);
apiRouter.use((_req, _res, next) => next(createHttpError(404)));
apiRouter.use(logErrors);
apiRouter.use(errorHandler);

function logErrors(err: HttpError, _req: Request, _res: Response, next: NextFunction) {
  logger.error(err);
  next(err);
}

function errorHandler(err: HttpError, _req: Request, res: Response) {
  createHttpError.isHttpError(err) ? res.status(err.status).json(err) : res.status(500).json(createHttpError(500));
}
