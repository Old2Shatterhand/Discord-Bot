module.exports = {
	name: 'leave',
	description: 'Forces the bot to leave the current channel',
	execute(message) {
		const voiceChannel = message.member.voice.channel;
		if (voiceChannel) {
			voiceChannel.leave();
		}
	},
};
