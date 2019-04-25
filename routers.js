const Router = require("./structures/router.js");
const mainRouter = Router("/")
const apiRouter = Router("/api")
const mainRouterController = require("./controllers/MainRouterController.js")
const apiRouterController = require("./controllers/ApiRouterController.js");
const rateLimit = require("express-rate-limit");

const createAccountLimiter = rateLimit({
    windowMs: 60 * 30 * 1000,
    max: 50,
});

apiRouter.get("/login", apiRouterController("/login"))
apiRouter.get("/logout", apiRouterController("/logout"))
apiRouter.post("/find", createAccountLimiter, apiRouterController("/find"))
apiRouter.post("/guild/find", createAccountLimiter, apiRouterController("/guild/find"))
apiRouter.post("/guild/save", createAccountLimiter, apiRouterController("/guild/save"))


mainRouter.get("/", mainRouterController("/"))
mainRouter.get("/profile", mainRouterController("/profile"))
mainRouter.get("/find", mainRouterController("/finder"))
mainRouter.get("/user/:id", mainRouterController("/user/id"))
mainRouter.get("/guilds", mainRouterController("/guilds"))
mainRouter.get("/guilds/view/:id", mainRouterController("/guilds/view/id"))
mainRouter.get("/invite", mainRouterController("/invite"))

module.exports = [
    mainRouter,
    apiRouter
]