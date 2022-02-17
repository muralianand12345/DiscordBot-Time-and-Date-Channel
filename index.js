require('dotenv').config();
const moment = require('moment');
const tz = require('moment-timezone');
const chalk = require('chalk');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const { TIMEZONE, FORMAT, FORMATDate, CHANNEL_ID, CHANNEL_IDate, UPDATE_INTERVAL, BOT_TOKEN} = process.env;

client.once('ready', () => {
  const timeNow = moment().tz(TIMEZONE).format(FORMAT);
  const clockChannel = client.channels.cache.get(CHANNEL_ID);
  clockChannel.edit({ name: `🕒 ${timeNow}` }, 'Clock update')
    .catch(console.error);
  setInterval(() => {
    const timeNowUpdate = moment().tz(TIMEZONE).format(FORMAT);
    clockChannel.edit({ name: `🕒 ${timeNowUpdate}` }, 'Clock update')
      .catch(console.error);
  }, UPDATE_INTERVAL);

  const timeNowDate = moment().tz(TIMEZONE).format(FORMATDate);
  const clockChannelDate = client.channels.cache.get(CHANNEL_IDate);
  clockChannelDate.edit({ name: `${timeNowDate}` }, 'Clock update')
    .catch(console.error);
  setInterval(() => {
    const timeNowUpdateDate = moment().tz(TIMEZONE).format(FORMATDate);
    clockChannelDate.edit({ name: `${timeNowUpdateDate}` }, 'Clock update')
      .catch(console.error);
  }, UPDATE_INTERVAL);

	console.log(chalk.greenBright("[READY]"), `Logged in as ${client.user.tag} (${client.user.id}) at ${moment().format("DD MMMM YYYY, HH:mm:ss")}`);
});

client.login(BOT_TOKEN);
