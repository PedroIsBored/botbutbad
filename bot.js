const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ game: { name: `Say 👌help | I am in ${client.guilds.size} guilds! ` }, status: "online"});
});
client.commands = new Discord.Collection();
const { token } = require("./config.json");
const commandFiles = fs.readdirSync("./commands");
//var schedule = require("node-schedule");
//if(message.author.id !== config.ownerID) return; <--- if only i can do the command.
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");
const settings = new Enmap({provider: new EnmapLevel({name:"settings"})});

const defaultSettings = {
  prefix: "👌",
  modRole: "Mod",
  adminRole: "Admin",
  welcomeChannel: "welcome",
  welcomeMessage: "{{user}} has joined the server! :D",
  goodbyeMessage: "{{user}} has left the server! ;-;"
};

client.on("guildCreate", guild => {
  console.log(`I joined a guild called ${guild.name}, it has ${guild.memberCount} members.`);
  client.user.setPresence({ game: { name: `Say 👌help | I am in ${client.guilds.size} guilds! ` }, status: "online"});
  settings.set(guild.id, defaultSettings);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from the guild ${guild.name} which had ${guild.memberCount} members.`);
  client.user.setPresence({ game: { name: `Say 👌help | I am in ${client.guilds.size} guilds! ` }, status: "online"});
  settings.delete(guild.id);
});

client.on("guildMemberAdd", member => {
  const guildConf = settings.get(member.guild.id);
  const welcomeMessage = guildConf.welcomeMessage.replace("{{user}}", member.user.tag);
  const channel = member.guild.channels.find("name", "member-log");
  if (!channel) return;
  member.guild.channels.find("name", guildConf.welcomeChannel).send(welcomeMessage).catch(console.error);
});

client.on("guildMemberRemove", member => {
  const channel = member.guild.channels.find("name", "member-log");
  const guildConf = settings.get(member.guild.id);
  const goodbyeMessage = guildConf.goodbyeMessage.replace("{{user}}", member.user.tag);
  if (!channel) return;
  member.guild.channels.find("name", guildConf.welcomeChannel).send(goodbyeMessage).catch(console.error);
});

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("message", message =>{
  if(message.author.bot) return;

  const guildConf = settings.get(message.channel.guild.id);

  if (!message.content.startsWith(guildConf.prefix)) return;

  const args = message.content.slice(guildConf.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);


  if (command.guildOnly && message.channel.type != "text") {
    return message.reply("This command doesn't work here.");
  }

  if (command.args && !args.length) {
    let reply = `You didn't give arguments, ${message.author}!`;

    if (command.usage){
      reply += `\nThe correct usage would be: \n${guildConf.prefix}${commandName} ${command.usage}`;
    }

    return message.channel.send(reply);
  }

  if (!client.commands.has(commandName)) return;

  try {
    command.execute(message, args, settings, guildConf);
  }
  catch (error) {
    console.error(error);
    message.reply("there was an error while running this command!");
  }
});

client.login(token);
