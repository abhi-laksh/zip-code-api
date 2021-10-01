const { Country } = require('../models')

exports.create = (req, res) => {
    Country.create(req.body)
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    error: true, 
                    message:"Data not found"
                });
            }
            res.send({
                success: true,
                data
            });
        })
        .catch(err => {
            res.status(400).send({
                message: (err.message || "Some error occurred while creating the country.")
            });
        })
}

exports.getCountry = (req, res) => {

    if ((req.query.id || req.query.iso2 || req.query.iso3)) {
        Country.findOne({
            where: {
                ...req.query
            },
            limit: 1,
        })
            .then((data) => {
                if (!data) {
                    return res.status(404).send({
                        error: true,
                        message:"Data not found"
                    });
                }
                res.send({
                    success: true,
                    data
                });
            })
            .catch(err => {
                res.status(400).send({
                    error: true,
                    message: (err.message || "Some error occurred while creating the country.")
                });
            })
    }

    else {
        Country.findAll()
            .then((data) => {
                res.send({
                    success: true,
                    data
                });
            })
            .catch(err => {
                res.status(400).send({
                    message: (err.message || "Some error occurred while creating the country.")
                });
            })
    }

}
