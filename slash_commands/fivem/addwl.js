const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const co = require('./../../config.json')

const mysql = require('mysql'); 

module.exports = {
	data: new SlashCommandBuilder()
    .setName("addwl")
    .setDescription("[🧬] » Adicione whitelist para um jogador.")
	.addStringOption(option => option.setName('steam').setDescription('Id').setRequired(true)),
	run: async (client, interaction) => {
	
		if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.followUp({ content: "Você não tem permissões suficientes para usar este comando.", ephemeral: true })


		const connection = mysql.createConnection({ 
			host: co.connection.host,
			user: co.connection.user,
			//password: co.connection.user,
			database: co.connection.database
		  })

		const steam = interaction.options.getString('steam')

		if(!steam) return interaction.followUp("😅 | Incapaz de encontrar detalhes do Steam HEX mencionado.");

		connection.query(`UPDATE urca_users SET whitelisted = '1' WHERE steam = '${steam}'`, (err, rows) => {
			let embed = new MessageEmbed()
 
				.setDescription(`📜 | Whitelist: Adicionado para Steam HEX: **${steam}**.`)
				.setColor("#303136")
 
			let sempassa = ('957431616542760960')
			let cidadao = ('881797857324199936')

			interaction.member.roles.add(cidadao)
			interaction.member.roles.remove(sempassa)
			return interaction.followUp({ embeds: [ embed ]})
		 });

	},
};