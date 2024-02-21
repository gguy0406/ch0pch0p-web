import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { expressInitializer } from '../src/server/express-initializer';

dotenv.config();

const app: Express = express();
const port = process.env['NG_SSR_PORT'] || 4000;

app.use(cors());
expressInitializer(app);
app.listen(port, () => console.log(`Node Express server listening on http://localhost:${port}`));
