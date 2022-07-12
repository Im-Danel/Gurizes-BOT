const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const { TicTacToe } = require('discord-gamecord')

module.exports = {
	data: new SlashCommandBuilder()
    .setName("jdv")
    .setDescription("[🎮] » Desafie Alguém Para Um Duelo!")
    .addUserOption((option) => option.setName('user').setDescription('O membro que quer desafiar').setRequired(true)),
	run: async (client, interaction) => {

        new TicTacToe({
            message: interaction,
            slash_command: true,
            opponent: interaction.options.getUser('user'),
            embed: {
              title: 'Jogo Da Velha',
              overTitle: 'Fim De Jogo',
              color: '#5865F2',
            },
            oEmoji: '🔵',
            xEmoji: '❌',
            blankEmoji: '➖',
            oColor: 'PRIMARY',
            xColor: 'DANGER',
            waitMessage: 'Esperando o adversário...',
            turnMessage: '{emoji} | É O Turno Do Jogador: **{player}**.',
            askMessage: 'Hey {opponent}, o {challenger} te desafiou para um jogo de Jogo Da Velha!',
            cancelMessage: 'Parece que eles se recusaram a ter um jogo de Jogo Da Velha!.',
            timeEndMessage: 'Como o oponente não respondeu, larguei o jogo!',
            drawMessage: 'Foi Um Empate!',
            winMessage: '{emoji} | **{winner}** Ganhou O Jogo!',
            gameEndMessage: 'O jogo ficou inacabado!',
          }).startGame();
	},
};