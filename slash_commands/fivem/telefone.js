const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')

const co = require('./../../config.json')

const mysql = require('mysql'); 

module.exports = {
	data: new SlashCommandBuilder()
    .setName("alterartelefone")
    .setDescription("[🧬] » Altere o número de telefone de um jogador.")
	.addStringOption(option => option.setName('id').setDescription('Id').setRequired(true))
	.addStringOption(option => option.setName('numero').setDescription('Número').setRequired(true)),
	run: async (client, interaction) => {
	
		if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.followUp({ content: "Você não tem permissões suficientes para usar este comando.", ephemeral: true })


		const connection = mysql.createConnection({ 
			host: co.connection.host,
			user: co.connection.user,
			password: co.connection.user,
			database: co.connection.database
		  })

		const id = interaction.options.getString('id')
		const numero = interaction.options.getString('numero')

		if(!id) return interaction.followUp("😅 | Incapaz de encontrar detalhes do ID mencionado.");
		if(!numero) return interaction.followUp("😅 | Incapaz de encontrar detalhes do número mencionado.");

		if (isNaN(id)) {

			let embed = new MessageEmbed()
	
				.setColor("RED")
				.addField(`**Ocorreu um erro.**`, "```yaml\nErro: Você inseriu um id inválido!```")
	
			return interaction.followUp({ embeds: [ embed ]})
		}

		if (isNaN(numero[0])) return interaction.followUp({ content: `**❌ | Erro**\n Isso não é um número`, ephemeral: true })

        connection.query(`UPDATE vrp_user_identities SET phone = '${numero}' WHERE user_id = '${id}'`, (err, rows) => { 

            let embed = new MessageEmbed()

                .setDescription(`📱 | O ID **${id}** Teve a número alterada para **${numero}**.`)
                .setColor("#303136")

                return interaction.followUp({ embeds: [ embed ]})

        });

	},
};