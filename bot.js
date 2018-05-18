const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands");
//var schedule = require("node-schedule");

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ game: { name: "BEING HEAVILY CODED AND MODIFIED" }, status: "occupied"});
});

client.on("message", message =>{
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);

  if (command.guildOnly && message.channel.type != "text") {
    return message.reply("Esse comando não funciona nas DMs!");
  }

  if (command.args && !args.length) {
    let reply = `Você não deu argumentos, ${message.author}!`;

    if (command.usage){
      reply += `\nA usagem correta seria: \n${prefix}${commandName} ${command.usage}`;
    }

    return message.channel.send(reply);
  }

  if (!client.commands.has(commandName)) return;

  try {
    command.execute(message, args);
  }
  catch (error) {
    console.error(error);
    message.reply("houve um erro executando esse comando!");
  }
});

client.login(token);
