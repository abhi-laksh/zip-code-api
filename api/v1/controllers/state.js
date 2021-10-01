const { State, Country } = require('../models')

exports.create = (req, res) => {
    State.create(req.body)
        .then((data) => {
            if (!data) {
                return res.status(500).send({
                    error: true,
                    message: "Cannot save data. Try again"
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

exports.getState = (req, res) => {

    if ((req.query.id || req.query.country_id)) {
        State.findAll({
            where: {
                ...req.query
            },

            include: [
                {
                    model: Country,
                    as: 'country'
                }
            ],
        })
            .then((data) => {
                if (!data) {
                    return res.status(404).send({
                        error: true,
                        message: "Data not found"
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
        State.findAll({
            include: [
                {
                    model: Country,
                    as: 'country'
                }
            ]
        })
            .then((data) => {
                res.send({
                    success: true,
                    data,
                });
            })
            .catch(err => {
                res.status(400).send({
                    message: (err.message || "Some error occurred while creating the country.")
                });
            })
    }

}
