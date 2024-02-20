import(`../dist/ch0pch0p-web/server/server.mjs`).then((server) => {
  const port = process.env['NG_SSR_PORT'] || 4000;

  server.app().listen(port, () => console.log(`Node Express server listening on http://localhost:${port}`));
});
