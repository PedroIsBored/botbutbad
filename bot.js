const { prefix, token } = require('./config.json');
const Discord = require('discord.js');
const bot = new Discord.Client();
var schedule = require('node-schedule');

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setPresence({ game: { name: 'in a working site' }, status: 'idle'});
  //const channelObject = bot.channels.get("310915980912099329")
});

//var evil = schedule.scheduleJob('27 16 * * *', function(){
//    console.log('whocares');
    //console.log('3AM');
//    channelObject.send('3AM, O HORARIO MAIS MALVADO DE TODOS!');
    //channel.send('3AM, O HORARIO MAIS MALVADO DE TODOS!');
//});

bot.on('message', msg =>{
    if (msg.content.startsWith(`${prefix}ping`)) {
        msg.channel.send('Pong');
    }
    if (msg.content.startsWith(`${prefix}server`)) {
        msg.channel.send(`O nome desse server é ${msg.guild.name}\nEste server tem ${msg.guild.memberCount} usuarios\nFoi criado em ${msg.guild.createdAt}\nE é da região ${msg.guild.region}`);
    }
    if (msg.content.startsWith(`${prefix}user-info`)){
        msg.channel.send(`Seu nome de usuario é ${msg.author.username}\nSeu ID é ${msg.author.id}`);
    }
});

//bot.on('guildMemberAdd', member => {
//    const channel = member.guild.channels.find('name', 'member-log');
//    if (!channel) return;
//    channel.send(`Bem vindo ao servidor, ${member}`);
//});
//bot.on('guildMemberRemove', member => {
//   const channel = member.guild.channels.find('name', 'member-log');
//   if (!channel) return;
//  channel.send(`Eu não gostava de você mesmo, ${member}!`);
//});

bot.login(token);
