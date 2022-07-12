const { Client, Intents, Collection, WebhookClient, MessageEmbed, MessageActionRow, MessageButton, DataManager } = require("discord.js"),
{ token, prefix, color, nome, ownerId, canalresult, cargoaprovado, connection, canalresultgeral } = require("./config.json"),
client = new Client( { intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES] })

client.prefix_commands = new Collection();
client.slash_commands = new Collection();
client.aliases = new Collection();
client.settings = { prefix, color, ownerId }

for(let handler of  ["slash_command", "prefix_command", "event"]) require(`./handlers/${handler}`)(client);

const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/964280779242889296/vusRZ-DYlXGGWDLTX51zbskTiuR4JIbi1ObE6lqfOfV84xV6OX43gPm75IuI9W0wCf1X' });

process.on('uncaughtException', err => {
    webhook.send(`<@337770791200489492> Deu Erro Burrão 👍.`)
    .catch(console.log(err));
  })

  client.on("messageCreate", (member) => {
    let canal = member.guild.channels.cache.get('992636505673703504');
    if (!canal) return;

    let cont = client.ws.ping;
    canal.setName(`📡・Ping: ${cont}`)
})


client.login(token)