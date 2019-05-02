const clientFunction = require("../structures/client.js")
const database = require('../structures/database.js')
async function main(req, res) {
    const client = clientFunction();
    if (!client) return;
    if (req.session.user) {
        res.render("main/dashboard.ejs", {
            id: req.session.user.id,
            username: req.session.user.username,
            tag: req.session.user.tag,
            avatar: req.session.user.displayAvatarURL,
            logged: true,
            clientAvatarDefault: client.user.defaultAvatarURL,
            clientTag: client.user.tag,
            pageTitle: 'Início',
            clientAvatar: client.user.displayAvatarURL.replace('.jpg', '.png'),
            emojis: client.emojis.size,
            servers: client.guilds.size,
            users: client.users.size,
            channels: client.channels.size,
            owner: client.users.get('471333722810089492')
        })
    }
    else res.render("main/dashboard.ejs", {
        logged: false,
        clientAvatarDefault: client.user.defaultAvatarURL,
        clientTag: client.user.tag,
        pageTitle: 'Início',
        clientAvatar: client.user.displayAvatarURL.replace('.jpg', '.png'),
        emojis: client.emojis.size,
        servers: client.guilds.size,
        users: client.users.size,
        channels: client.channels.size,
        owner: client.users.get('471333722810089492')
    })
}

function users(req, res) {
    const client = clientFunction()
    if (!client) return
    if (req.session.user) {
        res.render("main/findUser.ejs", {
            id: req.session.user.id,
            username: req.session.user.username,
            tag: req.session.user.tag,
            avatar: req.session.user.displayAvatarURL,
            logged: true,
            clientAvatarDefault: client.user.defaultAvatarURL,
            clientTag: client.user.tag,
            pageTitle: 'Procurar',
            clientAvatar: client.user.displayAvatarURL.replace('.jpg', '.png'),
        })
    } else {
        res.redirect('https://discordapp.com/api/oauth2/authorize?client_id=554402289259905037&redirect_uri=https://alicinha.glitch.me/api/login&response_type=code&scope=identify%20guilds')
    }
}

async function userProfile(req, res) {
    let client = clientFunction()
    if (!client) return
    let findedUser = client.users.get(req.params.id)
    if (req.session.user) {
        if (findedUser) {
                let db_user = await database.Users.findById(findedUser.id)
                db_user ? db_user : db_user = await new database.Users({ _id: findedUser.id })
            res.render("main/findedUser.ejs", {
                id: req.session.user.id,
                username: req.session.user.username,
                tag: req.session.user.tag,
                avatar: req.session.user.displayAvatarURL,
                logged: true,
                clientAvatarDefault: client.user.defaultAvatarURL,
                clientTag: client.user.tag,
                pageTitle: 'Perfil',
                clientAvatar: client.user.displayAvatarURL.replace('.jpg', '.png'),
                findedUserTag: findedUser.tag,
                findedUserAvatar: findedUser.displayAvatarURL,
                db_user,
                findedUser
            })
        } else {
            res.render("main/noFindUser.ejs", {
                id: req.session.user.id,
                username: req.session.user.username,
                tag: req.session.user.tag,
                avatar: req.session.user.displayAvatarURL,
                logged: true,
                clientAvatarDefault: client.user.defaultAvatarURL,
                clientTag: client.user.tag,
                pageTitle: 'Erro',
                clientAvatar: client.user.displayAvatarURL.replace('.jpg', '.png'),
            })
        }
    } else {
      res.redirect('https://discordapp.com/api/oauth2/authorize?client_id=554402289259905037&redirect_uri=https://alicinha.glitch.me/api/login&response_type=code&scope=identify%20guilds')
    }
}

async function Profile(req, res) {
    const client = clientFunction();
    if (!client) return;
    if (req.session.user) {
      let db_user = await database.Users.findById(req.session.user.id)
      db_user ? db_user : db_user = await new database.Users({ _id: req.session.user.id })
        res.render("main/profile.ejs", {
            id: req.session.user.id,
            username: req.session.user.username,
            tag: req.session.user.tag,
            avatar: req.session.user.displayAvatarURL,
            logged: true,
            clientAvatarDefault: client.user.defaultAvatarURL,
            clientTag: client.user.tag,
            pageTitle: 'Perfil',
            clientAvatar: client.user.displayAvatarURL.replace('.jpg', '.png'),
            profUser: client.users.get(req.session.user.id),
            db_user
        })
    } else {
        res.redirect('https://discordapp.com/api/oauth2/authorize?client_id=554402289259905037&redirect_uri=https://alicinha.glitch.me/api/login&response_type=code&scope=identify%20guilds')
    }
}

async function showGuilds(req, res) {
    const client = clientFunction();
    if (!client) return;
  
    if (req.session.user) {
        res.render("main/guilds.ejs", {
            id: req.session.user.id,
            username: req.session.user.username,
            tag: req.session.user.tag,
            avatar: req.session.user.displayAvatarURL,
            logged: true,
            clientAvatarDefault: client.user.defaultAvatarURL,
            clientTag: client.user.tag,
            pageTitle: 'Servidores',
            clientAvatar: client.user.displayAvatarURL.replace('.jpg', '.png'),
            guilds: req.session.guilds
        })
    } else {
        res.redirect('https://discordapp.com/api/oauth2/authorize?client_id=554402289259905037&redirect_uri=https://alicinha.glitch.me/api/login&response_type=code&scope=identify%20guilds')
    }
}

async function guildConfig(req, res) {
    const client = clientFunction();
    if (!client) return;
    const guild = client.guilds.get(req.params.id)
    if (req.session.user) {
      if (guild) {
          var db_guild = await database.Guilds.findById(guild.id)
          db_guild ? db_guild : db_guild = await new database.Guilds({ _id: guild.id})
        if (guild.members.get(req.session.user.id).hasPermission(['MANAGE_GUILD'])) {
          res.render("main/guildInfo.ejs", {
            id: req.session.user.id,
            username: req.session.user.username,
            tag: req.session.user.tag,
            avatar: req.session.user.displayAvatarURL,
            logged: true,
            clientAvatarDefault: client.user.defaultAvatarURL,
            clientTag: client.user.tag,
            pageTitle: 'Configurar',
            clientAvatar: client.user.displayAvatarURL.replace('.jpg', '.png'),
            guild,
            db_guild
          })
        } else {
          res.render("main/guildNoPerm.ejs", {
            id: req.session.user.id,
            username: req.session.user.username,
            tag: req.session.user.tag,
            avatar: req.session.user.displayAvatarURL,
            logged: true,
            clientAvatarDefault: client.user.defaultAvatarURL,
            clientTag: client.user.tag,
            pageTitle: 'Perfil',
            clientAvatar: client.user.displayAvatarURL.replace('.jpg', '.png'),
          })
        }
      } else {
        await client.generateInvite().then(i => res.redirect(`${i}&guild_id=${req.params.id}`))
      }
    } else {
      res.redirect('https://discordapp.com/api/oauth2/authorize?client_id=554402289259905037&redirect_uri=https://alicinha.glitch.me/api/login&response_type=code&scope=identify%20guilds')
    }
}

async function sendInvite(req, res) {
    const client = clientFunction();
    if (!client) return;
    await client.generateInvite().then(i => res.redirect(i))
}

async function sendHelp(req, res) {
    const client = clientFunction();
    if (!client) return;
    if (req.session.user) {
      res.render('main/placeholders.ejs', {
        id: req.session.user.id,
        username: req.session.user.username,
        tag: req.session.user.tag,
        avatar: req.session.user.displayAvatarURL,
        logged: true,
        clientAvatarDefault: client.user.defaultAvatarURL,
        clientTag: client.user.tag,
        pageTitle: 'Ajuda',
        clientAvatar: client.user.displayAvatarURL.replace('.jpg', '.png'),
      })
    } else {
      res.redirect('https://discordapp.com/api/oauth2/authorize?client_id=554402289259905037&redirect_uri=https://alicinha.glitch.me/api/login&response_type=code&scope=identify%20guilds')
    }
}

module.exports = function (route) {
    if (route == "/") return main
    if (route == "/profile") return Profile
    if (route == "/finder") return users
    if (route == "/user/id") return userProfile
    if (route == "/guilds") return showGuilds
    if (route == "/guilds/view/id") return guildConfig
    if (route == "/invite") return sendInvite
    if (route == "/help") return sendHelp
}