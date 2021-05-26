const { YTSearcher } = require('ytsearcher');
require('dotenv').config();

const { youtubePlayer } = require('../helpers/helpers');

module.exports = {
	name: 'play',
	description: 'Youtube player',
	queue: {
		channel: null,
		stream: null,
		songs: [],
		titles: [],
	},
	async execute(message, args) {
		const voiceChannel = message.member.voice.channel;
		const ytsearcher = new YTSearcher(process.env.YOUTUBE_API);
		const query = args.join(' ');
		const url =
			/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
		const yturl =
			/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
		let result;

		if (!voiceChannel)
			return message.channel.send('You need to be in a voice channel!');

		const permissions = voiceChannel.permissionsFor(message.client.user);

		if (!permissions.has('CONNECT'))
			return message.channel.send('You do not have connect permissions!');
		if (!permissions.has('SPEAK'))
			return message.channel.send('You do not have speak permissions!');

		if (!query)
			return message.channel.send('No url or search query provided!');

		if (url.test(query) && yturl.test(query)) {
			youtubePlayer(voiceChannel, message, query);
		}

		if (!url.test(query) && !yturl.test(query)) {
			try {
				result = await ytsearcher.search(query);

				if (result) {
					// Set up the server queue property
					this.queue.channel = voiceChannel;
					this.queue.songs.push(result.first.url);
					this.queue.titles.push(result.first.title);

					if (this.queue.songs.length === 1) {
						youtubePlayer(
							voiceChannel,
							message,
							this.queue,
							result.first.url
						);
						message.channel.send(
							`Now Playing: --${result.first.title}--`
						);
					} else {
						message.channel.send('Song added to the server queue');
					}
				}
			} catch (err) {
				message.channel.send(
					'I could not find a video with this search query 😢'
				);
			}

			if (url.test(query) && !yturl.test(query)) {
				message.channel.send('This is not a valid YouTube URL 🤔');
			}
		}
	},
};
