const fetch = require('node-fetch');
const ytdl = require('ytdl-core');

const player = (message, connection, queue) => {
	const stream = ytdl(queue.songs[0], {
		filter: 'audioonly',
	});

	const dispatcher = connection.play(stream, {
		seek: 0,
		volume: 0.5,
	});

	queue.stream = dispatcher;

	queue.stream.on('start', () => {
		message.channel.send(`Now Playing: -- ${queue.titles[0]} --`);
	});

	queue.stream.on('finish', () => {
		// Removes the current song from the server queue
		queue.songs.shift();
		queue.titles.shift();

		if (queue.songs?.length) player(message, connection, queue);
	});

	return queue;
};

module.exports = {
	getData(url) {
		const check = res => {
			if (res.ok) {
				return res;
			} else {
				throw new Error(`Error Message: ${res.statusText}`);
			}
		};
		return fetch(url)
			.then(check)
			.then(res => res.json())
			.then(body => body)
			.catch(err => console.error(err));
	},
	youtubePlayer(voiceChannel, message, queue) {
		return voiceChannel.join().then(connection => {
			player(message, connection, queue);

			queue.stream.on('error', err => {
				console.log(err);
			});
		});
	},
};
