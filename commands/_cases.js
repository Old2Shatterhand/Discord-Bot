const { getData } = require('../helpers/helpers');

module.exports = cases = (message) => {
	getData(`https://covid-api.mmediagroup.fr/v1/cases?country=${message.content.split(' ')[1]}`)
		.then((data) =>
			message.channel.send(`
            Total cases: ${data.All.confirmed}
            Total deaths: ${data.All.deaths}`)
		)
		.catch((err) => message.channel.send('Sorry I could not find this country'));
};
