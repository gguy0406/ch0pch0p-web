import winston from 'winston';

import { IS_PRODUCTION } from 'environments/environment';

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  http: 'green',
  debug: 'white',
});

export const logger = winston.createLogger({
  exitOnError: false,
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  transports: [
    new winston.transports.Console({
      level: IS_PRODUCTION ? 'info' : 'debug',
      format: winston.format.combine(winston.format.colorize({ all: !IS_PRODUCTION }), winston.format.simple()),
    }),
  ],
});
