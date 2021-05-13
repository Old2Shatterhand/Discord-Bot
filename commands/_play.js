const { YTSearcher } = require('ytsearcher');
require('dotenv').config();

const { youtubePlayer } = require('../helpers/helpers');

module.exports = play = async message => {
	const voiceChannel = message.member.voice.channel;
	const url = message.content.split(' ')[1];
	const searcher = new YTSearcher(process.env.YOUTUBE_API);
	let result;

	if (!voiceChannel)
		return message.channel.send('You need to be in a voice channel!');

	const permissions = voiceChannel.permissionsFor(message.client.user);

	if (!permissions.has('CONNECT'))
		return message.channel.send('You do not have connect permissions!');
	if (!permissions.has('SPEAK'))
		return message.channel.send('You do not have speak permissions!');

	if (!url) return message.channel.send('No url or search query provided!');

	if (
		!url.match(
			/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
		)
	) {
		try {
			result = await searcher.search(url);

			if (voiceChannel && result) {
				youtubePlayer(voiceChannel, message, result.first.url);
			}
		} catch (err) {
			message.channel.send(
				'I could not find a video with these search query 😢'
			);
		}
	}

	if (
		voiceChannel &&
		url.match(
			/^https?:\/\/(www\.)?youtube\.com\/(channel\/UC[\w-]{21}[AQgw]|(c\/|user\/)?[\w-]+)$/
		)
	) {
		youtubePlayer(voiceChannel, message, url);
	} else {
		channel.message.send(
			'The YouTube URL is not valid or I could not find a refering video 🤔'
		);
	}
};
