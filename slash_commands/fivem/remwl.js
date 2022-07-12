const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const co = require('./../../config.json')

const mysql = require('mysql'); 

module.exports = {
	data: new SlashCommandBuilder()
    .setName("remwl")
    .setDescription("[🧬] » Remova a whitelist para um jogador.")
	.addStringOption(option => option.setName('steam').setDescription('HEX').setRequired(true)),
	run: async (client, interaction) => {
	
		if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.followUp({ content: "Você não tem permissões suficientes para usar este comando.", ephemeral: true })

		const connection = mysql.createConnection({ 
			host: co.connection.host,
			user: co.connection.user,
			//password: co.connection.user,
			database: co.connection.database
		  })

		const steam = interaction.options.getString('steam')

		if(!steam) return interaction.followUp("😅 | Incapaz de encontrar detalhes do STEAM HEX mencionado.").then(msg => { setTimeout(() => { msg.delete() }, 5000 )});

		connection.query(`UPDATE urca_users SET whitelisted = '0' WHERE steam = '${steam}'`, (err, rows) => {
			let embed = new MessageEmbed()
 
				.setDescription(`📜 | Whitelist: Removida para STEAM HEX: **${steam}**.`)
				.setColor("#303136")
 
			let sempassa = ('957431616542760960')
			let cidadao = ('881797857324199936')

			interaction.member.roles.remove(cidadao)
			interaction.member.roles.add(sempassa)
			return interaction.followUp({ embeds: [ embed ]}).then(msg => { setTimeout(() => { msg.delete() }, 5000 )});
		 });

	},
};