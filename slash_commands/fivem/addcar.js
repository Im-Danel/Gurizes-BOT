const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const co = require('./../../config.json')

const mysql = require('mysql'); 

module.exports = {
	data: new SlashCommandBuilder()
    .setName("addcar")
    .setDescription("[🧬] » Adicione um carro a um jogador.")
	.addStringOption(option => option.setName('id').setDescription('Id').setRequired(true))
	.addStringOption(option => option.setName('carro').setDescription('Carro').setRequired(true)),
	run: async (client, interaction) => {
	
		if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.followUp({ content: "Você não tem permissões suficientes para usar este comando.", ephemeral: true })


		const connection = mysql.createConnection({ 
			host: co.connection.host,
			user: co.connection.user,
			//password: co.connection.user,
			database: co.connection.database
		  })

		const id = interaction.options.getString('id')
		const carro = interaction.options.getString('carro')

		if(!id) return interaction.followUp("😅 | Incapaz de encontrar detalhes do ID mencionado.");
		if(!carro) return interaction.followUp("😅 | Incapaz de encontrar detalhes do Carro mencionado.");

		if (isNaN(id)) {

			let embed = new MessageEmbed()
	
				.setColor("RED")
				.addField(`**Ocorreu um erro.**`, "```yaml\nErro: Você inseriu um id inválido!```")
	
			return interaction.followUp({ embeds: [ embed ]})
		}

		connection.query(`INSERT INTO vrp_user_vehicles(user_id, vehicle) VALUES ('${id}', '${carro}')`, (err, rows) => { 
			let embed = new MessageEmbed()
 
				.setDescription(`:oncoming_automobile: | Carro: **${carro}** Adicionado para ID: **${id}**.`)
				.setColor("#303136")
 
			return interaction.followUp({ embeds: [ embed ]})
		 });

	},
};