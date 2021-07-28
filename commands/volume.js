const { queue } = require('./play');

module.exports = {
	name: 'volume',
	description: 'Sets the volume of the current stream',
	execute(message, volume) {
		if (!volume?.length) {
			message.channel.send(
				'You need to provide a number between 0 and 1'
			);
		} else {
			if (queue.stream) {
				queue.stream.setVolume(volume);
			}
		}
	},
};
