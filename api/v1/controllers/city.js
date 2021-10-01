const { City, State, Country } = require('../models')

exports.create = (req, res) => {
    City.create(req.body)
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
                message: (err.message || "Some error occurred while creating the country.")
            });
        })
}

exports.getCity = (req, res) => {

    if ((req.query.id || req.query.country_id || req.query.state_id || req.query.postal_code)) {
        City.findAll({
            where: {
                ...req.query
            },
            include: [
                {
                    model: Country,
                    as: 'country'
                },
                {
                    model: State,
                    as: 'state'
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
        City.findAll({
            include: [
                
                {
                    model: Country,
                    as: 'country'
                },
                {
                    model: State,
                    as: 'state'
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
