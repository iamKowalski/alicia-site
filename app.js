const express = require("express")
const app = express();
const session = require("express-session");
const routers = require("./routers.js");
const bodyParser = require('body-parser')
const rateLimit = require("express-rate-limit");
const clientFunction = require('./structures/client.js')

app.enable("trust proxy");

const limiter = rateLimit({
  windowMs: 25 * 60 * 1000,
  max: 300,
  message: 'deu rate!'
});

app.use(limiter)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/assets', express.static('assets'));
const sess = {
  secret: 'keyboard cat',
  cookie: {}
}

app.use(session(sess))


routers.forEach(router => app.use(router.rote, router))


app.get("*", function (req, res) {
  const client = clientFunction()
  if (req.session.user) {
    res.render("main/404.ejs", {
      id: req.session.user.id,
      username: req.session.user.username,
      tag: req.session.user.tag,
      /* servers: client.guilds.size, */
      avatar: req.session.user.displayAvatarURL,
      /*       channels: client.channels.size,
            emojis: client.emojis.size,
            users: client.users.size, */
      logged: true,
      clientAvatarDefault: client.user.defaultAvatarURL,
      clientTag: client.user.tag,
      pageTitle: 'Erro',
      clientAvatar: client.user.displayAvatarURL.replace('.jpg', '.png')
    })
  } else {
    res.render("main/404.ejs", {
      logged: false,
      clientAvatarDefault: client.user.defaultAvatarURL,
      clientTag: client.user.tag,
      pageTitle: 'Erro',
      clientAvatar: client.user.displayAvatarURL.replace('.jpg', '.png'),
      /*       servers: client.guilds.size,
            channels: client.channels.size,
            emojis: client.emojis.size,
            users: client.users.size */
    })
  }
})

app.listen(process.env.PORT || 4000, async () => {
  console.log('Servidor online!')
})