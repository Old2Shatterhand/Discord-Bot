const { queue } = require('./play');

module.exports = {
	name: 'stop',
	description: 'Stops the current video',
	execute() {
		if (queue.stream) {
			queue.stream.dispatcher.end();
		}
	},
};
