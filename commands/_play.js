const ytdl = require('ytdl-core');

module.exports = play = (message) => {
	const voiceChannel = message.member.voice.channel;
	const url = message.content.split(' ')[1];

	if (!voiceChannel) return message.channel.send('You need to be in a voice channel!');

	const permissions = voiceChannel.permissionsFor(message.client.user);

	if (!permissions.has('CONNECT')) return message.channel.send('You do not have connect permissions!');
	if (!permissions.has('SPEAK')) return message.channel.send('You do not have speak permissions!');

	if (!url) return message.channel.send('No url provided!');
	if (
		!url.match(
			/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
		)
	)
		return message.channel.send('This url is not valid');

	if (voiceChannel) {
		voiceChannel
			.join()
			.then((connection) => {
				const stream = ytdl(url, { filter: 'audioonly' });
				connection.play(stream, { seek: 0, volume: 1 }).on('finish', () => {
					voiceChannel.leave();
				});
			})
			.catch((err) => message.channel.send('I could not find this video'));
	}
};
