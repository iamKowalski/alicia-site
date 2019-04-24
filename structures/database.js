const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect("mongodb+srv://luis:Muriel2001@alicia-bot-f6nt7.mongodb.net/test?retryWrites=true", { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(`Erro ao tentar realizar conexão com a database...\n${err}`)
  } else {
    console.log('Database conectada com sucesso!')
  }
})

var UserSchema = new Schema({
    _id: String,
    globalLevel: { type: Number, default: 1 },
    globalXp: { type: Number, default: 0 },
    favColor: { type: String, defautl: "#937DD9" },
    personalText: { type: String, default: "Para alterar sua descrição use %command%!" },
    bans: { type: Number, default: 0 },
    kicks: { type: Number, default: 0 },
    mutes: { type: Number, default: 0 },
    warns: { type: Number, default: 0 },
    history: { type: Array, default: [] }
})

var GuildSchema = new Schema({
  _id: String,
  prefix: { type: String, default: 'a@' }
})

module.exports.Users = mongoose.model("Users", UserSchema)
module.exports.Guilds = mongoose.model("guilds", GuildSchema)