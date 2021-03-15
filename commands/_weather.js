const Discord = require('discord.js');
const { getData } = require('../helpers/helpers');
require('dotenv').config();

module.exports = weather = (message) => {
    getData(
        `https://api.openweathermap.org/data/2.5/weather?q=${
            message.content.split(' ')[1]
        }&appid=${process.env.WEATHER_API}`
    )
        .then((data) => {
            const embed = new Discord.MessageEmbed()
                .setTitle(
                    `The weather for: ${message.content
                        .split(' ')[1]
                        .toUpperCase()}`
                )
                .setTimestamp()
                .addFields([
                    {
                        name: 'Longitude: ',
                        value: `${data.coord.lon} East`,
                    },
                    {
                        name: 'Latitude: ',
                        value: `${data.coord.lat} North`,
                    },
                    {
                        name: 'Description: ',
                        value: data.weather[0].description,
                    },
                    {
                        name: 'Temperature: ',
                        value: `${Math.round(data.main.temp - 273.15)} °C`,
                    },
                    {
                        name: 'Humididty: ',
                        value: `${data.main.humidity} %`,
                    },
                    {
                        name: 'Pressure: ',
                        value: `${data.main.pressure} hPa`,
                    },
                    {
                        name: 'Wind: ',
                        value: `${data.wind.speed} Bf`,
                    },
                ])
                .setThumbnail(
                    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
                )
                .setFooter('Tims Bot');
            return message.channel.send(embed);
        })
        .catch((err) => message.channel.send('I cannot find this city'));
};
