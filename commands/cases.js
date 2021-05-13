const { getData } = require('../helpers/helpers');

module.exports = {
	name: 'cases',
	description: 'Returns the current covid cases in the country given',
	execute(message, args) {
		const country = `${args[0].slice(0, 1).toUpperCase()}${args[0].slice(
			1
		)}`;
		getData(`https://covid-api.mmediagroup.fr/v1/cases?country=${country}`)
			.then(data =>
				message.channel.send(`
				Total cases: ${data.All.confirmed}
				Total deaths: ${data.All.deaths}`)
			)
			.catch(err =>
				message.channel.send('Sorry I could not find this country')
			);
	},
};
