const city = require("../controllers/city");

const router = require("express").Router();

router.post("/city", city.create);
router.get("/city", city.getCity);

module.exports = router;