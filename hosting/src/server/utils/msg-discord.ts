export function sendMessageToDiscord(message: string) {
  fetch(`https://discord.com/api/webhooks/${process.env['DISCORD_WEBHOOK']}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ username: 'web-runner', content: message }),
  });
}
