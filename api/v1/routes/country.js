const country = require("../controllers/country");

const router = require("express").Router();

router.post("/country", country.create);
router.get("/country", country.getCountry);

module.exports = router;