const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
    .setName("atualizar")
    .setDescription("[🤖] » Recarregue os comandos de / em seu servidor"),
	run: async (client, interaction) => {

        let owner = [interaction.guild.ownerId, '295400872106655744', '337770791200489492']

        //if(!owner.includes(interaction.user.id )) return interaction.channel.send(`⚔️ | Esse comando só pode ser usado pelo dono do servidor ou meu criador.`)
        await interaction.guild.commands.set([...client.slash_commands].map(x => x[1].data))

        return interaction.channel.send("✅ |  Comandos de Slash foram recarregados.")

	},
}; 