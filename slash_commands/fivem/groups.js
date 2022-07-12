const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const co = require('./../../config.json')

const mysql = require('mysql'); 

module.exports = {
	data: new SlashCommandBuilder()
    .setName("groups")
    .setDescription("[🧬] » Veja os groups um jogador.")
	.addStringOption(option => option.setName('id').setDescription('Id').setRequired(true)),
	run: async (client, interaction) => {
	
		if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.followUp({ content: "Você não tem permissões suficientes para usar este comando.", ephemeral: true })


		const connection = mysql.createConnection({ 
			host: co.connection.host,
			user: co.connection.user,
			password: co.connection.user,
			database: co.connection.database
		  })

		const id = interaction.options.getString('id')

		if(!id) return interaction.followUp("😅 | Incapaz de encontrar detalhes do ID mencionado.");

		if (isNaN(id)) {

			let embed = new MessageEmbed()
	
				.setColor("RED")
				.addField(`**Ocorreu um erro.**`, "```yaml\nErro: Você inseriu um id inválido!```")
	
			return interaction.followUp({ embeds: [ embed ]})
		}
    
            connection.query(`SELECT dvalue FROM vrp_user_data WHERE user_id = ${id} AND dkey = 'vRP:datatable'`, function (error, result, fields) {
            console.log(result)
			let embed = new MessageEmbed()
 
				.setDescription(`:oncoming_automobile: | Groups De: **${id}**.`)
                .setColor("#303136")
                        
			return interaction.followUp({ embeds: [ embed ]})
		 });

	},
};