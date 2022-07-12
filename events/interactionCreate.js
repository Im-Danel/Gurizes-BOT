module.exports = {
    run: async (client, interaction) => {
        if (!interaction.isCommand()) return;
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const { commandName } = interaction;
        const command = client.slash_commands.get(commandName)
        if(!command) return interaction.followUp("Comando desconhecido: Não consegui encontrar esse comando no bot.")

        try {
            if(command) await command.run(client, interaction)
        } catch (err) {
            console.log(err)
            return interaction.followUp(`Algo deu errado ao executar o comando.`)
        }
    }
}