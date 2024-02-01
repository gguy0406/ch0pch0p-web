import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import compression from 'compression';
import bootstrap from './src/main.server';
import { expressInitializer } from './src/server/express-initializer';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine({ enablePerformanceProfiler: true });

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);
  server.use(compression());

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  expressInitializer(server);

  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, { maxAge: '1y' }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const server = app();
  const port = process.env['PORT'] || 4000;

  server.listen(port, () => console.log(`Node Express server listening on http://localhost:${port}`));
}

run();
