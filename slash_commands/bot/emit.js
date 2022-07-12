const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
    .setName("emit")
    .setDescription("[🤖] » Recarregue os comandos de / em seu servidor")
    .addUserOption(option => option.setName('user').setDescription('Usuário').setRequired(true)),
	run: async (client, interaction) => {

        let owner = [interaction.guild.ownerId, '295400872106655744', '337770791200489492']

        if(!owner.includes(interaction.user.id )) return interaction.channel.send(`⚔️ | Esse comando só pode ser usado pelo dono do servidor ou meu criador.`)
        const jogador = interaction.options.getUser('user')
        client.emit("guildMemberUpdate", jogador);

	},
}; 