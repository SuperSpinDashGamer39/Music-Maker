const ytdl = require('ytdl-core')
const ytsearch = require('yt-search')

module.exports = {
    name: 'play',
    description: 'plays a song',
    async execute(message, args){
        const VoiceChannel = message.member.voice.channel

        if(!VoiceChannel) return message.channel.send('you need you be in a voice channel')
        const  permissions = VoiceChannel.permissionsFor(message.client.user)
        if (!permissions.has('CONNECT')) return message.channel.send('you dont have the connect permission')
        if (!permissions.has('SPEAK')) return message.channel.send('you dont have the speak permission')
        if (!args.length) return message.channel.send('you have to add a second argument')

        const connection = await VoiceChannel.join()

        const Videofinder = async (query) => {
            const VideoResult = await ytsearch(query)

            return (VideoResult.videos.length > 1 ) ? VideoResult.videos[0] : null;


        }

        const video = await Videofinder(args.join(' '))

        if(video){
            const stream  = ytdl(video.url, {filter: 'audioonly'})

            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                VoiceChannel.leave()
            })
            await message.reply(`:thumbsup: now playing ***${video.title}***`)
        }else{
            message.channel.send('no results found')
        }
    }
}