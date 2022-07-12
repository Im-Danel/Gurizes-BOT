module.exports = {
    run: (client, message) => {
        if(message.author.bot || !message.guild || !message.content.startsWith(client.settings.prefix)) return;
        const args = message.content.slice(client.settings.prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        let command = client.prefix_commands.get(cmd)
        if (!command) command = client.prefix_commands.get(client.aliases.get(cmd));
        if(!command) return;

        if (command.botPermissions) {
            const Permissions = command.botPermissions.filter(x => !message.guild.me.permissions.has(x)).map(x => "`" + x + "`")
            if (Permissions.length) return message.channel.send(`Eu preciso das permissões: ${Permissions.join(", ")} para executar o comando!`)
        } 
          
        if (command.memberPermissions) {
            const Permissions = command.memberPermissions.filter(x => !message.member.permissions.has(x)).map(x => "`" + x + "`")
            if (Permissions.length) return message.channel.send(`Você precisa das permissões: ${Permissions.join(", ")} para utilizar o comando!`)
        }
        
        if (command.ownerOnly) {
            if (message.author.id !== client.settings.ownerId) return message.channel.send("Esse comando só pode ser usado pelo meu criador :C")
        }

        command.run(client, message, args)
    }
}
