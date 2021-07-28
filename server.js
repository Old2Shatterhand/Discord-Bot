const express = require('express');

const server = express();

server.all('/', (req, res) => {
	res.send('Bot is running');
});

module.exports = runner = () => {
	server.listen(3000, () => {
		console.log('Ready');
	});
};
