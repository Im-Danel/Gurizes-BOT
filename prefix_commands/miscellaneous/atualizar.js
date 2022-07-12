module.exports = {
    description: "Recarregue os comandos de / em seu servidor",
    run: async (client, message) => {
       // if(message.author.id !== message.guild.ownerId) return message.channel.send(`⚔️ | Esse comando só pode ser usado pelo dono do servidor.`)
        await message.guild.commands.set([...client.slash_commands].map(x => x[1].data))

        return message.channel.send("✅ |  Comandos de Slash foram recarregados.")
    }
}