import { rateLimit } from 'express-rate-limit';

export const limiter = rateLimit({ windowMs: 24 * 60 * 60 * 1000, limit: 100 });
