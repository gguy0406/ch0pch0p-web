import morgan from 'morgan';

import { logger } from '../utils/logger';

export const httpLogger = morgan('tiny', {
  skip: (_req, res) => process.env['NODE_ENV'] === 'production' && res.statusCode < 400,
  stream: { write: (message: string) => logger.http(message) },
});
