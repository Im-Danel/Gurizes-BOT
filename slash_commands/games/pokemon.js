const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const { GuessThePokemon } = require('discord-gamecord')

module.exports = {
	data: new SlashCommandBuilder()
    .setName("pokemon")
    .setDescription("[🎮] » Quem é esse Pokemon?"),
	run: async (client, interaction) => {
	
        new GuessThePokemon({
            message: interaction,
            slash_command: true,
            embed: {
              title: 'Quem é esse Pokemon?',
              footer: 'Você tem apenas 1 chance para acertar.',
              color: 'RANDOM',
            },
            time: 60000, ///Tempo de inatividade em milissegundos
            thinkMessage: '**Pensando...**',
            winMessage: 'Boa! O pokemon é... **{pokemon}!**',
            stopMessage: 'Demorou demais! O pokemon era **{pokemon}**',
            incorrectMessage: 'Talvez da próxima vez... 🥲 O pokemon era **{pokemon}**',
          }).startGame();
	},
};