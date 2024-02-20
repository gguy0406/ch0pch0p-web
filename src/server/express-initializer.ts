import { Express } from 'express';
import { cert, initializeApp } from 'firebase-admin/app';
import helmet from 'helmet';

import { apiRouter } from './routes';
import { logger } from './utils/logger';

export function expressInitializer(app: Express) {
  const serviceAccount = JSON.parse(process.env['CHOP_SERVICE_ACCOUNT'] as string);

  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/gm, '\n');

  initializeApp({ credential: cert(serviceAccount) });

  app.disable('x-powered-by');
  app.use(helmet());
  app.use('/api', apiRouter);

  process.on('uncaughtExceptionMonitor', (err, origin) => logger.error(origin, err));
}
