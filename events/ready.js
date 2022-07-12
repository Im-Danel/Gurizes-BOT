module.exports = {
    run: (client) => {
        console.log(`[ ${client.user?.username} ] : Conectado No Discord Com ${client.ws?.ping}ms!`)
    }
}