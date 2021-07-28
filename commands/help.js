require('dotenv').config();

module.exports = {
	name: 'help',
	description: 'Provides an overview of the available commands',
	execute(message, Discord) {
		const embed = new Discord.MessageEmbed()
			.setTitle('HELP')
			.setDescription(
				`**Overview of my available functions and commands**\nThe prefix for all commands on this server: ${process.env.PREFIX}`
			)
			.setColor('#fff')
			.addFields([
				{ name: '\u200B', value: '\u200B' },
				{
					name: 'YouTube Player',
					value: 'Available commands and arguments for the YouTube Player',
				},
				{
					name: 'play',
					value: 'search query, yt url',
					inline: true,
				},
				{ name: 'pause', value: '-', inline: true },
				{ name: 'resume', value: '-', inline: true },
				{ name: 'skip', value: '-', inline: true },
				{
					name: 'Covid-19',
					value: 'Retrieve current covid data from a country',
				},
				{ name: 'cases', value: 'city', inline: true },
				{
					name: 'Weather',
					value: 'Weather information from a city or country',
				},
				{ name: 'weather', value: 'city, country', inline: true },
				{ name: '\u200B', value: '\u200B' },
			])
			.setThumbnail()
			.setTimestamp()
			.setFooter(
				// eslint-disable-next-line quotes
				"Tim's Bot",
				'https://github.com/old2shatterhand/discord-bot/blob/c31998408ccfa2ceebfef066db1a4a30725479b2/src/img/logo.png'
			);
		return message.channel.send(embed);
	},
};
