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
	youtubePlayer(voiceChannel, message, url) {
		return voiceChannel
			.join()
			.then(connection => {
				try {
					const stream = ytdl(url, {
						filter: 'audioonly',
					});
					connection
						.play(stream, { seek: 0, volume: 0.5 })
						.on('finish', () => {
							voiceChannel.leave();
						});
				} catch (err) {
					message.channel.send(
						'I could not find a video with this url 😢'
					);
				}
			})
			.catch(err => message.channel.send('I could not find this video'));
	},
	// embeddedMessage(title, fields, thumbnail, footer) {
	//     const embed = new Discord.MessageEmbed()
	//         .setTitle(title)
	//         .setTimestamp()
	//         .addFields(fields)
	//         .setThumbnail(thumbnail)
	//         .setFooter(footer);
	//     return embed;
	// },
};
