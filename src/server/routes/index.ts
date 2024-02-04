import express, { NextFunction, Request, Response, Router } from 'express';
import createHttpError, { HttpError } from 'http-errors';
import morgan from 'morgan';

import { logger } from '../utils/logger';
import { router as swappableTraitsRouter } from './swappable-traits.route';

export const apiRouter = Router();

apiRouter.use(express.urlencoded({ extended: false }));
apiRouter.use(express.json());
apiRouter.use(httpLogger());
apiRouter.use('/swappable-traits', swappableTraitsRouter);
apiRouter.use((_req, _res, next) => next(createHttpError(404)));
apiRouter.use(logErrors);
apiRouter.use(errorHandler);

function httpLogger() {
  return morgan(':method :url', {
    immediate: true,
    skip: (_req, res) => process.env['NODE_ENV'] === 'production' && res.statusCode < 400,
    stream: { write: (message: string) => logger.http(message.trim()) },
  });
}

function logErrors(err: HttpError, _req: Request, _res: Response, next: NextFunction) {
  logger.error(err);
  next(err);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandler(err: HttpError, _req: Request, res: Response, next: NextFunction) {
  if (createHttpError.isHttpError(err)) {
    res.status(err.status).json(createHttpError(err.status).message);
    return;
  }

  res.status(500).json(createHttpError(500).message);
}
