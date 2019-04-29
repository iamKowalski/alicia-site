const { Client } = require("discord.js")
const client = new Client({ fetchAllMembers: true })

client.fetchName = function (name) {
    return this.users.filter(a => a.username.toLowerCase().includes(name.toLowerCase())).first(100).map(a => ({
        id: a.id,
        avatar: a.displayAvatarURL,
        username: a.username,
        tag: a.tag
    }))
}
client.login("NTU0NDAyMjg5MjU5OTA1MDM3.D2cHgA.z4ozrwpstjj0kUV1oi4YdZSJ7To").then(async () => console.log('Bot online!'))
module.exports = () => client.users ? client : null