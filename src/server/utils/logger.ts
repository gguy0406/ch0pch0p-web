import winston from 'winston';

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
      level: process.env['NODE_ENV'] === 'production' ? 'info' : 'debug',
      format: winston.format.combine(
        winston.format.colorize({ all: process.env['NODE_ENV'] !== 'production' }),
        winston.format.simple()
      ),
    }),
  ],
});
