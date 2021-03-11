module.exports = pause = (message) => {
	const voiceChannel = message.member.voice.channel;
	if (voiceChannel) {
		voiceChannel.leave();
	}
};
