    const { SlashCommandBuilder } = require('@discordjs/builders');
    const { MessageEmbed } = require('discord.js')
    
    const co = require('./../../config.json')

    const mysql = require('mysql'); 
    
    module.exports = {
        data: new SlashCommandBuilder()
        .setName("id")
        .setDescription("[🧬] » Descubra o id de um jogador.")
        .addUserOption(option => option.setName('user').setDescription('Usuário').setRequired(true)),
        run: async (client, interaction) => {
        
            if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.followUp({ content: "Você não tem permissões suficientes para usar este comando.", ephemeral: true })
    
    
            const connection = mysql.createConnection({ 
                host: co.connection.host,
                user: co.connection.user,
                password: co.connection.user,
                database: co.connection.database
              })

            const jogador = interaction.options.getUser('user')
            if(!jogador) return interaction.followUp("😅 | Incapaz de encontrar detalhes do Usuário mencionado.");

           connection.query(`SELECT * FROM vrp_user_ids  WHERE identifier = ?`, ["discord:" + jogador.id], function (error, result, fields) {
            if (error) throw error;

            let embednao = new MessageEmbed()
                    .setTitle('ERRO')
                    .setDescription(`O Id do Usuário: ${jogador} não foi encontrado em nosso banco de dados.`)
                    .setColor("RED")

            if (!result[0]) return interaction.followUp({ embeds: [ embednao ]})

                let embed = new MessageEmbed()
                .addFields(
                    { name: 'Discord:', value: `${jogador}` },
                    { name: 'Id:', value: `${result[0].user_id}` }
                )
                    .setColor("#303136")
     
                interaction.followUp({ embeds: [ embed ]})
             })

             connection.on('error', function(err) {
                console.log("[mysql error]",err);
              });

            },
    };