const clientFunction = require("../structures/client.js")
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
        res.render("main/noauth.ejs", {
            logged: false,
            clientAvatarDefault: client.user.defaultAvatarURL,
            clientTag: client.user.tag,
            pageTitle: 'Erro',
            clientAvatar: client.user.displayAvatarURL.replace('.jpg', '.png'),
        })
    }
}

async function userProfile(req, res) {
    let client = clientFunction()
    if (!client) return
    let findedUser = client.users.get(req.params.id)
    if (req.session.user) {
        if (findedUser) {
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
                findedUserAvatar: findedUser.displayAvatarURL
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
        res.render("main/noauth.ejs", {
            logged: false,
            clientAvatarDefault: client.user.defaultAvatarURL,
            clientTag: client.user.tag,
            pageTitle: 'Erro',
            clientAvatar: client.user.displayAvatarURL.replace('.jpg', '.png'),
        })
    }
}

async function Profile(req, res) {
    const client = clientFunction();
    if (!client) return;
    if (req.session.user) {
        res.render("main/profile.ejs", {
            id: req.session.user.id,
            username: req.session.user.username,
            tag: req.session.user.tag,
            avatar: req.session.user.displayAvatarURL,
            logged: true,
            clientAvatarDefault: client.user.defaultAvatarURL,
            clientTag: client.user.tag,
            pageTitle: 'Perfil',
            clientAvatar: client.user.displayAvatarURL.replace('.jpg', '.png')
        })
    } else {
        res.render("main/noauth.ejs", {
            logged: false,
            clientAvatarDefault: client.user.defaultAvatarURL,
            clientTag: client.user.tag,
            pageTitle: 'Erro',
            clientAvatar: client.user.displayAvatarURL.replace('.jpg', '.png'),
        })
    }
}

module.exports = function (route) {
    if (route == "/") return main
    if (route == "/profile") return Profile
    if (route == "/finder") return users
    if (route == "/user/id") return userProfile
}