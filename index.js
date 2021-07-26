const Discord = require('discord.js')
const Client = new Discord.Client();
const prefix = '!'


const fs = require('fs');

Client.commands = new Discord.Collection();

const CommandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for(const file of CommandFiles){
    const command = require(`./commands/${file}`);

    Client.commands.set(command.name, command)
}



Client.once('ready', () => {
    console.log('bot is ready')

    
})

Client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'play'){
        Client.commands.get('play').execute(message, args)
    }
    if(command === 'leave'){
        Client.commands.get('leave').execute(message, args)
    }
})

Client.login(process.env.token)