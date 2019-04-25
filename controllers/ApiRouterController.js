const request = require("request")
const User = require("../structures/user.js")
const database = require("../structures/database.js")
const bt = require('btoa')
const clientFunction = require("../structures/client.js")
const secret = "AZ85WBC36wiOdUBaFNe8OYkq9jVhDJ2J";
const id = "554402289259905037"
const redirect_uri = "https://alicinha.glitch.me/api/login"
function login(req, res) {
    if (!req.query.code) return res.redirect("/");
    request({
        method: 'POST', url: `https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${req.query.code}&redirect_uri=${redirect_uri}`, headers: {
            Authorization: `Basic ${bt(id + ":" + secret)}`
        }
    }, function (_, _, body) {
        const json = JSON.parse(body);
        request({
            method: 'GET',
            url: 'https://discordapp.com/api/users/@me',
            headers: {
                Authorization: 'Bearer ' + json['access_token']
            }
        }, async function (_, _, userBody) {
            userBody = JSON.parse(userBody)
            if (!userBody.id) return res.redirect("/");
            request({
              method: 'GET',
              url: 'https://discordapp.com/api/users/@me/guilds',
              headers: {
                Authorization: 'Bearer ' + json['access_token']        
              }
            }, async function (_,_,guildBody) {
              guildBody = JSON.parse(guildBody)
              req.session.guilds = guildBody
              req.session.user = new User(userBody)
              res.redirect("/");
            })
        })
    })
}

function find(req, res) {
    if (!req.session.user) return res.end("Invalid")
    const client = clientFunction()
    if (!client) return;
    const { name } = req.body;
    res.json(client.fetchName(name).slice(0, 50))
}

async function saveConfig(req, res) {
    if (!req.session.user) return res.end("Invalid")
    const client = clientFunction()
    if (!client) return;
    const { id, prefixo, logs, logsChannel, welcomeOn, welcome, levelOn, level, leaveOn, leave, userId } = req.body
    var db_guild = await database.Guilds.findById(id)
    db_guild ? db_guild : db_guild = await new database.Guilds({ _id: id})
    db_guild.prefix = prefixo
    if (logs) {
      db_guild.logs = true
      db_guild.logsChannel = logsChannel
    } else {
      db_guild.logs = false
      db_guild.logsChannel = null
    }
    if (welcomeOn) {
      db_guild.welcome = {
        channel: welcome.channel,
        message: welcome.message
      }
    } else {
      db_guild.welcome = null
    }
    if (leaveOn) {
      db_guild.leave = {
        channel: leave.channel,
        message: leave.message
      }
    } else {
      db_guild.leave = null
    }
    if (levelOn) {
      db_guild.leveling = {
        channel: level.channel,
        message: level.message
      }      
    } else {
      db_guild.leveling = null
    } 
    await db_guild.save().then(async (d) => {
      await res.end("Done")
      if (d.logs) {
        client.guilds.get(d._id).channels.get(d.logsChannel).send({embed: { "description": `**${client.users.get(userId).tag}** fez alterações nas configuração do servidor através do [**menu online**](https://alicinha.glitch.me/guilds/view/${id})!`, "color": 9666009 }})
      }
    })
}

async function searchServer(req, res) {
    if (!req.session.user) return res.end("Invalid")
    if (!req.session.guilds) return res.end("Invalid")
    const client = clientFunction()
    if (!client) return;
    const { name } = req.body
    
    res.json(req.session.guilds.filter(g => g.name.toLowerCase().includes(name.toLowerCase())).slice(0,10))
}

function logout(req, res) {
    if (req.session.user) req.session.user = null
    return res.redirect("/")
}

module.exports = function (route) {
    if (route == "/login") return login
    if (route == "/logout") return logout
    if (route == "/find") return find
    if (route == "/user/id") return user
    if (route == "/guild/save") return saveConfig
    if (route == "/guild/find") return searchServer

}