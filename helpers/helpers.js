const fetch = require('node-fetch');
const ytdl = require('ytdl-core');

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
			for (let song of queue.songs) {
				message.channel.send(`Now Playing: -- ${queue.titles[0]} --`);

				const stream = ytdl(song, {
					filter: 'audioonly',
				});

				queue.stream = connection;

				queue.stream
					.play(stream, { seek: 0, volume: 0.5 })
					.on('finish', () => {
						// Removes the current song from the server queue
						queue.songs.shift();
						queue.titles.shift();
					})
					.catch(err => message.channel.send(err));
			}
		});
	},
};
