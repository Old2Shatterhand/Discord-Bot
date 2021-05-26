const { youtubePlayer } = require('../helpers/helpers');
const { queue } = require('./play');

module.exports = {
	name: 'skip',
	description:
		'skips the current YouTube video and plays the next one in the queue',
	execute(message) {
		const voiceChannel = queue.channel;
		const permissions = voiceChannel.permissionsFor(message.client.user);

		// Remove the first element of the arrays
		queue.songs.shift();
		queue.titles.shift();

		if (!voiceChannel)
			return message.channel.send('You need to be in a voice channel!');

		if (!permissions.has('CONNECT'))
			return message.channel.send('You do not have connect permissions!');
		if (!permissions.has('SPEAK'))
			return message.channel.send('You do not have speak permissions!');

		if (!queue.songs?.length)
			return message.channel.send('The video queue is empty');

		if (queue.songs.length >= 1 && queue.titles.length >= 1) {
			youtubePlayer(voiceChannel, message, queue, queue.songs[0]);
			message.channel.send(`Now Playing: --${queue.titles[0]}--`);
		}
	},
};
