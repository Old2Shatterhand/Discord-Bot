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
	youtubePlayer(voiceChannel, message, queue, url) {
		return voiceChannel
			.join()
			.then(connection => {
				const stream = ytdl(url, {
					filter: 'audioonly',
				});
				queue.stream = connection;

				queue.stream
					.play(stream, { seek: 0, volume: 0.5 })
					.on('finish', () => {
						// Removes the current song from the server queue
						queue.songs.shift();
						queue.titles.shift();
						voiceChannel.leave();
					});
			})
			.catch(err => message.channel.send(err));
	},
};
