const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
    .setName("autoc")
    .setDescription("[🧬] »  » Painel de Autoconnect"),
	run: async (client, interaction) => {

        if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.followUp({ content: "Você não tem permissões suficientes para usar este comando.", ephemeral: true })

        let guildname = interaction.guild.name
        
        let embed = new MessageEmbed()
        .setColor("#303136")
        .setAuthor({ name: `${guildname}`, iconURL: interaction.guild.iconURL({ dynamic: true})})
        .setThumbnail(interaction.guild.iconURL({ dynamic: true}))
        .addField('\u200B', '\u200B', true)
        .addFields(
            { name: 'Ip:', value: '\```connect localhost\```' },
            { name: 'TeamSpeak:', value: '\```localhost.ts```' } 
        )

        let button = new MessageButton()
        .setStyle('LINK')
		.setLabel('Servidor') 
		.setURL('https://tinyurl.com/centropfivem')
        .setEmoji('801118988892635198')
		.setDisabled(false); 
      
    let button2 = new MessageButton()
    .setStyle('LINK')
    .setLabel('TeamSpeak') 
    .setURL('https://tinyurl.com/centropts')
    .setEmoji('862397556239499275')
    .setDisabled(false);  

    
    let button3 = new MessageButton()
    .setStyle('LINK')
    .setLabel('TS Plugin')
    .setURL('https://cdn.discordapp.com/attachments/944639029893288016/944639455745179658/tokovoip_plugin_cprp_1.ts3_plugin')
    .setEmoji('801118989371310141')
    .setDisabled(false); 
      
    let row = new MessageActionRow().addComponents(button, button2, button3)


        interaction.channel.send({ embeds: [embed], components: [row] })

    },
};