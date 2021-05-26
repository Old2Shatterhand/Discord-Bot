const { queue } = require('./play');

module.exports = {
	name: 'stop',
	description: 'Stops the current video',
	execute() {
		queue.stream.dispatcher.end();
	},
};
