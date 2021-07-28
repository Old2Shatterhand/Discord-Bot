require('dotenv').config();

module.exports = {
	name: 'help',
	description: 'Provides an overview of the available commands',
	execute(message, Discord) {
		const embed = new Discord.MessageEmbed()
			.setTitle('Functionality that I implemented with  ❤')
			.setColor('#fff')
			.addFields([
				{ name: '\u200B', value: '\u200B' },
				{
					name: '***YouTube Player***',
					value: 'To play a song simply provide a YouTube url or let me find it for you based on your keywords\nYou can create a playlist by adding multiple songs to the server queue with the play command',
				},
				{
					name: '`_play`',
					value: '+ search query or yt url',
					inline: true,
				},
				{ name: '`_pause`', value: '-', inline: true },
				{ name: '`_resume`', value: '-', inline: true },
				{ name: '`_skip`', value: '-', inline: true },
				{
					name: '`_volume`',
					value: '+ Floating-point number between 0 and 1',
					inline: true,
				},
				{
					name: '***Covid-19***',
					value: 'Retrieve current covid data from a country',
				},
				{ name: '`_cases`', value: '+ country', inline: true },
				{
					name: '***Weather***',
					value: 'Weather information from a city or country',
				},
				{
					name: '`_weather`',
					value: '+ city or country',
					inline: true,
				},
				{ name: '\u200B', value: '\u200B' },
			])
			.setThumbnail()
			.setTimestamp()
			.setFooter(
				// eslint-disable-next-line quotes
				"Tim's Bot",
				'https://cdn.discordapp.com/app-icons/818627968804716544/9859b6cfdb1e3ddfd47d0b99961782d7.png'
			);
		return message.channel.send(embed);
	},
};
