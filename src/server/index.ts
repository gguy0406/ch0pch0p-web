import express, { Express } from 'express';
import cors from 'cors';

import { expressInitializer } from './express-initializer';

const app: Express = express();
const port = process.env['PORT'] || 4000;

app.use(cors());
expressInitializer(app);
app.listen(port, () => console.log(`Node Express server listening on http://localhost:${port}`));
