var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var schedule = require('node-schedule');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
var evil = schedule.scheduleJob('0 3 * * *', function(){
    bot.sendMessage({
        to: "310915980912099329",
        message: "3AM, O HORARIO MAIS MALVADO DE TODOS >:D!"
    });
    logger.info('3AM');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    var strr = message.split("").reverse().join("").replace(" ","");
    
    if ((message.toLowerCase().replace(" ", "").includes("top")) || (strr.toLowerCase().includes("top"))){
        //bot.sendMessage({
        //  to: channelID,
        //  message: ':ok_hand:'
        //});
        bot.addReaction({
            channelID: channelID,
            messageID: evt.d.id,
            reaction: "👌"
        });
        //message.addReaction(':ok_hand:')
        //message.react(':ok_hand::skin-tone-1:');
        //message.react(':ok_hand::skin-tone-2:');
        //message.react(':ok_hand::skin-tone-3:');
        //message.react(':ok_hand::skin-tone-4:');
        //message.react(':ok_hand::skin-tone-5:');
    }
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'URMOMGAY':
                bot.sendMessage({
                    to: channelID,
                    message: 'NO U!!1!1!!11!!'
                    
                });
                break;
            case '3AM':
                bot.sendMessage({
                    to: channelID,
                    message: 'O HORARIO MAIS MALVADO DE TODOS >:D!'
                });
                break;
            case 'nextjob':
                bot.sendMessage({
                    to: channelID,
                    message: evil.nextInvocation()
                });
                bot.sendMessage({
                    to: channelID,
                    message: reminder.nextInvocation()
                });
                break;
            case 'frick':
                bot.sendMessage({
                    to: userID,
                    message: "frick off mate"
                })
                logger.info("FRICKME SENT TO:"+user)
                break;
            // Just add any case commands if you want to..
         }
     }
});
