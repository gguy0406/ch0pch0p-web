import winston from 'winston';

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
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
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf((info) => `${info['timestamp']} ${info.level}: ${info.message}`)
  ),
  transports: [new winston.transports.File({ filename: 'api-log' })],
});

if (process.env['NODE_ENV'] !== 'production') {
  logger.add(new winston.transports.Console({ format: winston.format.simple(), level: 'debug' }));
}
