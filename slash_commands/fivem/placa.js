const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')

const co = require('./../../config.json')

const mysql = require('mysql'); 

module.exports = {
	data: new SlashCommandBuilder()
    .setName("alterarplaca")
    .setDescription("[🧬] » Altere a placa do carro de um jogador.")
	.addStringOption(option => option.setName('id').setDescription('Id').setRequired(true))
	.addStringOption(option => option.setName('placa').setDescription('placa').setRequired(true)),
	run: async (client, interaction) => {
	
		if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.followUp({ content: "Você não tem permissões suficientes para usar este comando.", ephemeral: true })


		const connection = mysql.createConnection({ 
			host: co.connection.host,
			user: co.connection.user,
			password: co.connection.user,
			database: co.connection.database
		  })

		const id = interaction.options.getString('id')
		const placa = interaction.options.getString('placa')

		if(!id) return interaction.followUp("😅 | Incapaz de encontrar detalhes do ID mencionado.");
		if(!placa) return interaction.followUp("😅 | Incapaz de encontrar detalhes do placa mencionado.");

		if (isNaN(id)) {

			let embed = new MessageEmbed()
	
				.setColor("RED")
				.addField(`**Ocorreu um erro.**`, "```yaml\nErro: Você inseriu um id inválido!```")
	
			return interaction.followUp({ embeds: [ embed ]})
		}

        if (placa.length !== 8) {
            let embed = new MessageEmbed()
    
                .setColor("RED")
                .addField(`**Ocorreu um erro.**`, "```yaml\nErro: A placa só pode conter exatos 8 dígitos!```")
    
                return interaction.followUp({ embeds: [ embed ]})
        }

        connection.query(`UPDATE vrp_user_identities SET registration = '${placa}' WHERE user_id = '${id}'`, (err, rows) => { 

            let embed = new MessageEmbed()

                .setDescription(`:placard: | O ID **${id}** Teve a placa alterada para **${placa}**.`)
                .setColor("#303136")

                return interaction.followUp({ embeds: [ embed ]})

        });

	},
};