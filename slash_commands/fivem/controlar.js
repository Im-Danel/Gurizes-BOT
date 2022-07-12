const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const co = require('./../../config.json')

const mysql = require('mysql'); 

module.exports = {
	data: new SlashCommandBuilder()
    .setName("controlar")
    .setDescription("[🧬] » Olhe algumas informações sobre um jogador.")
	.addStringOption(option => option.setName('id').setDescription('Id').setRequired(true)),
	run: async (client, interaction) => {
	
		if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.followUp({ content: "Você não tem permissões suficientes para usar este comando.", ephemeral: true })


		const connection = mysql.createConnection({ 
			host: co.connection.host,
			user: co.connection.user,
			//password: co.connection.user,
			database: co.connection.database
		  })

		const id = interaction.options.getString('id')
		const ele = interaction.user.id

		if(!id) return interaction.followUp("😅 | Incapaz de encontrar detalhes do ID mencionado.");

		if (isNaN(id)) {

			let embederr = new MessageEmbed()
	
				.setColor("RED")
				.addField(`**Ocorreu um erro.**`, "```yaml\nErro: Você inseriu um id inválido!```")
	
			return interaction.followUp({ embeds: [ embederr ]})
		}

    let button = new MessageButton()
    .setStyle('PRIMARY')
	.setCustomId('car')
    .setEmoji('941903507596906526')
	.setDisabled(false); 
      
    let button2 = new MessageButton()
    .setStyle('PRIMARY')
	.setCustomId('lic')
    .setEmoji('941901832857456650')
    .setDisabled(false);  

    
    let button3 = new MessageButton()
    .setStyle('PRIMARY')
	.setCustomId('info')
    .setEmoji('941908361023197224')
    .setDisabled(false); 

	let button4 = new MessageButton()
    .setStyle('PRIMARY')
	.setCustomId('din')
    .setEmoji('941909824436834356')
    .setDisabled(false); 
      
    let row = new MessageActionRow().addComponents(button3, button2, button, button4)

	const embed = new MessageEmbed()
	.setTitle('Clique em algum botão')

    const me = await interaction.channel.send({embeds: [embed], components: [row], fetchReply: true})
    const collector = interaction.channel.createMessageComponentCollector({componentType: 'BUTTON', time: 10 * 6000 })

		//Licenças
		connection.query(`SELECT * FROM vrp_user_ids WHERE user_id = ${id}`, function (error, result, fields) {
			if(error) {
				throw error;
			  }
			let embednao = new MessageEmbed()
                    .setTitle('ERRO')
                    .setDescription(`Não encontramos nada em nosso banco de dados sobre o id ${id}`)
                    .setColor("RED")

            if (!result[0]) return me.edit({embeds: [embednao], components: []})
				let embed = new MessageEmbed()
					.setAuthor({ name: `ID: ${id}`, iconURL: interaction.guild.iconURL({ dynamic: true}), url: 'https://discord.gg/hvYednZcCY' })
					.setTitle(`<:license:941901832857456650> Licenças:`)
					.addFields(
						{ name: 'Discord:', value: `${result[0].identifier}` },
						{ name: 'License2:', value: `${result[1].identifier}` },
						{ name: 'License:', value: `${result[2].identifier}` },
						{ name: 'Live:', value: `${result[3].identifier}` },
						{ name: 'Steam:', value: `${result[4].identifier}` },
						{ name: 'Xbl:', value:`${result[5].identifier}` }
					)
					.setColor("#303136")
						
					collector.on('collect', interaction2 => {
						//interaction2.deferUpdate();
						if( interaction2.user.id !== ele ) return interaction2.reply({ content: `❌ apenas o ${member} tem permissão de reagir no botão`, ephemeral: true })
							if (interaction2.customId === 'lic') {
							
							me.edit({
							embeds: [embed],
							components: [row]
							})
						};
					});

				//return interaction.followUp({ embeds: [ embedli ]})
			 });

	//Info
	connection.query(`SELECT * FROM vrp_user_identities WHERE user_id = ${id}`, function (error, result, fields) {
		if(error) {
			throw error;
		  }
		  if (!result[0]) return 

			let embed = new MessageEmbed()
				.setAuthor({ name: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true})})
				.setTitle(`<:info:941908361023197224> Informações:`)
				.addFields(
					{ name: 'Nome:', value: `${result[0].name}` },
					{ name: 'Sobrenome:', value: `${result[0].firstname}` },
					{ name: 'Idade:', value: `${result[0].age}` },
					{ name: 'Telefone', value: `${result[0].phone}` },
					{ name: 'Registro:', value: `${result[0].registration}` }
				)
				.setColor("#303136")
					
				collector.on('collect', interaction3 => {
					//interaction3.deferUpdate();
					if( interaction3.user.id !== ele ) return interaction3.reply({ content: `❌ apenas o ${member} tem permissão de reagir no botão`, ephemeral: true })
						if (interaction3.customId === 'info') {
						
						me.edit({
						embeds: [embed],
						components: [row]
						})
					};
				});
		 });

		//Din
		connection.query(`SELECT * FROM vrp_user_moneys WHERE user_id = ${id}`, function (error, result, fields) {
			if(error) {
				throw error;
			  }
			  if (!result[0]) return 

				let embed = new MessageEmbed()
					.setAuthor({ name: `ID: ${id}`, iconURL: interaction.guild.iconURL({ dynamic: true}), url: 'https://discord.gg/hvYednZcCY' })
					.setTitle(`<:din:941909824436834356> Informações Monetárias:`)
					.addFields(
						{ name: 'Carteira:', value: `${result[0].wallet}` },
						{ name: 'Banco:', value: `${result[0].bank}` }
					)
					.setColor("#303136")
						
					collector.on('collect', interaction4 => {
						interaction4.deferUpdate();
						if( interaction4.user.id !== ele ) return interaction4.reply({ content: `❌ apenas o ${member} tem permissão de reagir no botão`, ephemeral: true })
							if (interaction4.customId === 'din') {
							
							me.edit({
							embeds: [embed],
							components: [row]
							})
						};
					});
			 });

	//Carros
	connection.query(`SELECT * FROM vrp_user_vehicles WHERE user_id = ${id}`, function (error, result, fields) {
		if(error) {
			throw error;
		  }
		  if (!result[0]) return 
		  const embed = new MessageEmbed()
				.setAuthor({ name: `ID: ${id}`, iconURL: interaction.guild.iconURL({ dynamic: true}), url: 'https://discord.gg/hvYednZcCY' })
				.setTitle(`<:car:941903507596906526> Carros:\n\nO Usuário tem ${result.length} carros em sua garagem`)
				.addFields(
					result.length < 1 ? { name: 'Nenhum', value: '\u200b' } : result.map(r =>
						({ name: `> ${r.vehicle}`, value: `Motor: ${r.engine} | Chassi: ${r.body} | Gasolina: ${r.fuel}` })
					))
				.setColor("#303136")

				collector.on('collect', interaction5 => {
					//interaction5.deferUpdate();
					if( interaction5.user.id !== ele ) return interaction5.reply({ content: `❌ apenas o ${member} tem permissão de reagir no botão`, ephemeral: true })
						if (interaction5.customId === 'car') {
						
						me.edit({
						embeds: [embed],
						components: [row]
						})
					};
				});
		 });

	},
};