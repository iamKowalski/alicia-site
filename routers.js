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


mainRouter.get("/", mainRouterController("/"))
mainRouter.get("/profile", mainRouterController("/profile"))
mainRouter.get("/find", mainRouterController("/finder"))
mainRouter.get("/user/:id", mainRouterController("/user/id"))

module.exports = [
    mainRouter,
    apiRouter
]