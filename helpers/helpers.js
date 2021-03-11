const fetch = require('node-fetch');

module.exports = {
	getData(url) {
		const check = (res) => {
			if (res.ok) {
				return res;
			} else {
				throw new Error(`Error Message: ${res.statusText}`);
			}
		};
		return fetch(url)
			.then(check)
			.then((res) => res.json())
			.then((body) => body)
			.catch((err) => console.error(err));
	},
};
