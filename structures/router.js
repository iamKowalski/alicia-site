const { Router } = require("express")
function Gen(route) {
    const router = Router();
    router.rote = route
    return router;
}
module.exports = Gen