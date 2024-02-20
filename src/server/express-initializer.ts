import { Express } from 'express';
import { cert, initializeApp, ServiceAccount } from 'firebase-admin/app';
import helmet from 'helmet';

import { apiRouter } from './routes';
import { logger } from './utils/logger';

export function expressInitializer(app: Express) {
  initializeApp({ credential: cert(process.env['CH0P_SERVICE_ACCOUNT'] as ServiceAccount) });

  app.disable('x-powered-by');
  app.use(helmet());
  app.use('/api', apiRouter);

  process.on('uncaughtExceptionMonitor', (err, origin) => logger.error(origin, err));
}
