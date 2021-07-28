const { queue } = require('./play');

module.exports = {
	name: 'resume',
	description: 'Resumes the current video',
	execute() {
		if (queue.stream) {
			queue.stream.resume();
		}
	},
};
