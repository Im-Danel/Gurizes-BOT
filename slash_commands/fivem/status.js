const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')

const Gamedig = require('gamedig')

module.exports = {
	data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("[🧬] » Veja o status do servidor."),
	run: async (client, interaction) => {
	
		if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.followUp({ content: "Você não tem permissões suficientes para usar este comando.", ephemeral: true })

		let ip = 


        Gamedig.query({
			type: 'fivem',
			host: 'localhost',
		}).then((state) => {

            let embed = new MessageEmbed()
	
                .setColor("#303136")
                .setTitle(`${interaction.guild.name}`)
                .addField(`**<:status:808397847484825670> Servidor:**`, `connect ${state.connect}`)
                .addField(`**<:friend:861381869630914621> Jogadores**`, `${state.raw.clients}/${state.raw.sv_maxclients}`)
                .setFooter({ text: `Ping do bot com o servidor 🏓 ${state.ping}ms`})
                .setThumbnail(`${interaction.guild.iconURL({ dynamic: true, size: 2048 })}`)
	
			interaction.followUp({ embeds: [ embed ]})

		}).catch((error) => {
			let embed2 = new MessageEmbed()
	
                .setColor("#303136")
                .setTitle(`${interaction.guild.name}`)
                .addField(`**<:status:808397847484825670> Servidor:**`, `Offline`)
                .setThumbnail(`${interaction.guild.iconURL({ dynamic: true, size: 2048 })}`)
	
			interaction.followUp({ embeds: [ embed2 ]})
		});

	},
};