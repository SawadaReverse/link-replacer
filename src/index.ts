import { Events, Client } from 'discord.js';
import { Logger } from './libs/Logger';
import { replaceUrl } from './libs/UrlParser';
import { GatewayIntentBits } from 'discord.js';

let TOKEN = process.env.BOT_TOKEN;
if (!TOKEN) {
  Logger.debug('No token provided, trying to load from .env');
  import('dotenv/config')
    .then(() => (TOKEN = process.env.BOT_TOKEN))
    .catch((e) => Logger.error(e.message || 'failed to load token from .env'));
}

if (!TOKEN) {
  Logger.error('No token provided, exiting');
  process.exit(1);
}

Logger.debug(`token load successful. loading...`);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

client.login(TOKEN);

client.once(Events.ClientReady, (c) => {
  Logger.info(`Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  const parsed = replaceUrl(message.content);
  if (parsed.length > 0) {
    Logger.debug(`Parsed: ${parsed}`);
    message.channel.send(parsed.join('\n'));
  }
});
