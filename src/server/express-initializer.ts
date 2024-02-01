import { Express } from 'express';
import helmet from 'helmet';

import { apiRouter } from './routes';
import { logger } from './utils/logger';

export function expressInitializer(app: Express) {
  app.disable('x-powered-by');
  app.use(helmet());
  app.use('/api', apiRouter);
}

process.on('uncaughtExceptionMonitor', (err, origin) => logger.error(origin, err));
