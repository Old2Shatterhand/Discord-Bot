const { queue } = require('./play');

module.exports = {
	name: 'pause',
	description: 'Pauses the current video',
	execute() {
		if (queue.stream) {
			queue.stream.pause();
		}
	},
};
