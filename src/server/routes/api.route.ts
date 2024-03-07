import express, { NextFunction, Request, Response, Router } from 'express';
import createHttpError, { UnknownError, HttpError } from 'http-errors';
import morgan from 'morgan';

import { IS_PRODUCTION } from 'environments/environment';

import { API_ROUTE } from '../lib/constants';
import { logger } from '../utils/logger';
import { router as eventRegisterRouter } from './event-registers.route';
import { router as luckyGachaRouter } from './lucky-gacha.route';
import { router as nftPoolRouter } from './nft-pool.route';
import { router as swappableTraitsRouter } from './swappable-traits.route';

export const apiRouter = Router();

apiRouter.use(express.urlencoded({ extended: false }));
apiRouter.use(express.json());
apiRouter.use(httpLogger());
apiRouter.use(API_ROUTE.EVENT_REGISTERS, eventRegisterRouter);
apiRouter.use(API_ROUTE.LUCKY_GACHA, luckyGachaRouter);
apiRouter.use(API_ROUTE.NFT_POOL, nftPoolRouter);
apiRouter.use(API_ROUTE.SWAPPABLE_TRAITS, swappableTraitsRouter);
apiRouter.use((req, res, next) => next(createHttpError(404)));
apiRouter.use(logErrors);
apiRouter.use(errorHandler);

function httpLogger() {
  return morgan(':method :url', {
    immediate: true,
    skip: (req, res) => IS_PRODUCTION && res.statusCode < 400,
    stream: { write: (message: string) => logger.http(message.trim()) },
  });
}

function logErrors(err: UnknownError | HttpError, req: Request, res: Response, next: NextFunction) {
  logger.error(createHttpError.isHttpError(err) ? err : (err as UnknownError).toString());
  next(err);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandler(err: HttpError, req: Request, res: Response, next: NextFunction) {
  if (createHttpError.isHttpError(err)) {
    res.status(err.status).json(createHttpError(err.status).message);
    return;
  }

  res.status(500).json(createHttpError(500).message);
}
