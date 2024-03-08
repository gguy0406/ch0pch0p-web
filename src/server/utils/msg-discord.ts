import https from 'node:https';

export function sendMessageToDiscord(message: string) {
  const req = https.request({
    headers: { 'Content-Type': 'application/json' },
    hostname: 'discord.com',
    path: `/api/webhooks/${process.env['DISCORD_WEBHOOK']}`,
    method: 'POST',
  });

  req.write(JSON.stringify({ username: 'web-runner', content: message }));
  req.on('error', (err) => console.error(`Send message error ${err.message}`));
  req.end();
}
