import { Express } from 'express';
import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import helmet from 'helmet';

import { apiRouter } from './routes';
import { logger } from './utils/logger';
import serviceAccount from './service-account.json';

export function expressInitializer(app: Express) {
  initializeApp({ credential: cert(serviceAccount as ServiceAccount) });

  app.disable('x-powered-by');
  app.use(helmet());
  app.use('/api', apiRouter);

  process.on('uncaughtExceptionMonitor', (err, origin) => logger.error(origin, err));
}
