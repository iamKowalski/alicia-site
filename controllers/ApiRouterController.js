const request = require("request")
const User = require("../structures/user.js")
const bt = require('btoa')
const clientFunction = require("../structures/client.js")
const secret = "AZ85WBC36wiOdUBaFNe8OYkq9jVhDJ2J";
const id = "554402289259905037"
const redirect_uri = "https://alicinha.herokuapp.com/api/login"
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
            req.session.user = new User(userBody)
            res.redirect("/");
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

function user(req, res) {

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

}