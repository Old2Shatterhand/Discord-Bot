const { getData } = require('../helpers/helpers');

module.exports = {
	name: 'cases',
	description: 'Returns the current covid cases in the country given',
	execute(message, args, Discord) {
		if (args?.length) {
			const country = `${args[0].slice(0, 1).toUpperCase()}${args[0]
				.slice(1)
				.toLowerCase()}`;
			getData(
				`https://covid-api.mmediagroup.fr/v1/cases?country=${country}`
			)
				.then(data => {
					const embed = new Discord.MessageEmbed()
						.setTitle('COVID-19')
						.setDescription('-')
						.setColor('#fff')
						.addFields([
							{
								name: 'Total Cases',
								value: data.All.confirmed,
							},
							{
								name: 'Total Deaths',
								value: data.All.deaths,
							},
						])
						.setThumbnail()
						.setTimestamp()
						.setFooter(
							// eslint-disable-next-line quotes
							"Tim's Bot",
							'https://cdn.discordapp.com/app-icons/818627968804716544/9859b6cfdb1e3ddfd47d0b99961782d7.png'
						);
					return message.channel.send(embed);
				})
				.catch(err =>
					message.channel.send('Sorry I could not find this country')
				);
		}
	},
};
