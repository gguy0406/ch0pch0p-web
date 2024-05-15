const { onRequest } = require('firebase-functions/v2/https');
const server = import('firebase-frameworks');
exports.ssrch0pch0p = onRequest({ region: 'asia-east1', memory: '512MiB' }, (req, res) =>
  server.then((it) => it.handle(req, res))
);
