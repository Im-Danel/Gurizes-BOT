const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const co = require('./../../config.json')

const mysql = require('mysql'); 

module.exports = {
	data: new SlashCommandBuilder()
    .setName("addmoney")
    .setDescription("[🧬] » Adicione dinheiro a um jogador.")
	.addStringOption(option => option.setName('id').setDescription('Id').setRequired(true))
	.addStringOption(option => option.setName('quantia').setDescription('Quantia').setRequired(true)),
	run: async (client, interaction) => {
	
		if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.followUp({ content: "Você não tem permissões suficientes para usar este comando.", ephemeral: true })


		const connection = mysql.createConnection({ 
			host: co.connection.host,
			user: co.connection.user,
			//password: co.connection.user,
			database: co.connection.database
		  })

		const id = interaction.options.getString('id')
		const quantia = interaction.options.getString('quantia')

		if(!id) return interaction.followUp("😅 | Incapaz de encontrar detalhes do ID mencionado.");
		if(!quantia) return interaction.followUp("😅 | Incapaz de encontrar detalhes da Quantia mencionado.");

		if (isNaN(id)) {

			let embed = new MessageEmbed()
	
				.setColor("RED")
				.addField(`**Ocorreu um erro.**`, "```yaml\nErro: Você inseriu um id inválido!```")
	
			return interaction.followUp({ embeds: [ embed ]})
		}

            connection.query(`UPDATE vrp_user_moneys SET bank = bank + ${quantia} WHERE user_id = '${id}'`, (err, rows) => {
			let embed = new MessageEmbed()
 
				.setDescription(`💸 | Quantia: **${quantia}** Adicionado para ID: **${id}**.`)
				.setColor("#303136")
 
			return interaction.followUp({ embeds: [ embed ]})
		 });

	},
};