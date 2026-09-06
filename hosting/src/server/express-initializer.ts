import { Express } from 'express';
import { cert, initializeApp } from 'firebase-admin/app';
import helmet from 'helmet';

import { apiRouter } from './routes/api.route';
import { logger } from './utils/logger';

export function expressInitializer(app: Express) {
  const serviceAccountJson = process.env['CHOP_SERVICE_ACCOUNT'];

  if (serviceAccountJson) {
    const serviceAccount = JSON.parse(serviceAccountJson);
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/gm, '\n');
    initializeApp({ credential: cert(serviceAccount) });
  } else {
    initializeApp();
  }

  app.use(helmet({ contentSecurityPolicy: false }));
  app.use('/api', apiRouter);

  process.on('uncaughtExceptionMonitor', (err, origin) => logger.error(origin, err));
}
