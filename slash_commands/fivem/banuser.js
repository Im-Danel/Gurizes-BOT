const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")

const co = require('./../../config.json')

const mysql = require('mysql'); 


module.exports = {
    data: new SlashCommandBuilder()
    .setName("banuser")
    .setDescription("[🧬] » Permite ao administrador ou proprietário banir algum membro do servidor.")
    .addStringOption(option => option.setName('hex').setDescription('Steam Hex do membro que quer banir').setRequired(true))
    .addUserOption((option) => option.setName('user').setDescription('O membro que quer banir').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Motivo para banir o membro').setRequired(true)),
    run: async (client, interaction) => {

        if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.followUp({ content: "Você não tem permissões suficientes para usar este comando.", ephemeral: true })


		const connection = mysql.createConnection({ 
			host: co.connection.host,
			user: co.connection.user,
			password: co.connection.user,
			database: co.connection.database
		  })
       const user = interaction.options.getUser('user')
       const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})

       if(!member) return interaction.followUp("😅 | Incapaz de obter detalhes do membro.");
       const reason = interaction.options.getString('reason')
       const hex = interaction.options.getString('hex')
       if(!hex) return interaction.followUp("😅 | Incapaz de encontrar detalhes do ID mencionado.");
        
    connection.query(`UPDATE urca_users SET banned = '1' WHERE steam = '${hex}}'`, (err, rows) => { 
        const embed = new MessageEmbed()
        .setDescription(`🛑 | O ID **${hex}** Foi banido do servidor \nMotivo: \`${reason}\``)
        .setColor("#303136")
        .setTimestamp()

        member.user.send(`Você foi banido do servidor**\`${interaction.guild.name}\`\n** Motivo: \`${reason}\``).catch(err => {})
        return interaction.followUp({ embeds: [ embed ]})
    });
    },
    
};
