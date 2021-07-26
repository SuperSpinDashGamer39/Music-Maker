const { description, execute } = require("./play");

module.exports = {
    name: 'leave',
    description: 'makes the bot leave the vc',
    async execute(message, args){
        const VoiceChannel = message.member.voice.channel

        if(!VoiceChannel) return
        await VoiceChannel.leave()
        await message.channel.send('Leaving channel')
    }
}