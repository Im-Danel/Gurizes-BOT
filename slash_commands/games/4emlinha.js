const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const { Connect4 } = require('discord-gamecord')

module.exports = {
	data: new SlashCommandBuilder()
    .setName("4emlinha")
    .setDescription("[🎮] » Desafie Alguém Para Um Duelo!")
    .addUserOption((option) => option.setName('user').setDescription('O membro que quer desafiar').setRequired(true)),
	run: async (client, interaction) => {

        new Connect4({
            message: interaction,
            slash_command: true,
            opponent: interaction.options.getUser('user'),
            embed: {
              title: '4 Em Linha',
              color: '#5865F2',
            },
            emojis: {
              player1: '🔵',
              player2: '🟡'
            },
            waitMessage: 'Esperando O Oponente..',
            turnMessage: '{emoji} | É O Turno Do Jogador: **{player}**.',
            winMessage: '{emoji} | **{winner}** Ganhou O Jogo!',
            gameEndMessage: 'O jogo ficou inacabado!',
            drawMessage: 'Foi Um Empate!',
            othersMessage: 'Você não tem permissão para usar botões para esta mensagem!',
            askMessage: 'Hey {opponent}, o {challenger} te desafiou para um jogo de 4 Em Linha!',
            cancelMessage: 'Parece que eles se recusaram a ter um jogo de 4 Em Linha!.',
            timeEndMessage: 'Como o oponente não respondeu, larguei o jogo!',
          }).startGame()   
	},
};