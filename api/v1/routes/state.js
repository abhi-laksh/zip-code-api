const state = require("../controllers/state");

const router = require("express").Router();

router.post("/state", state.create);
router.get("/state", state.getState);

module.exports = router;