import express, { Express } from 'express';
import cors from 'cors';

import { expressInitializer } from '../src/server/express-initializer';

const app: Express = express();
const port = process.env['NG_SSR_PORT'] || 4000;

app.use(cors());
expressInitializer(app);
app.listen(port, () => console.log(`Node Express server listening on http://localhost:${port}`));
