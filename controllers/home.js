const home = require('../models/home.js')

const getHome = (req, res) => {
    home.find({home}, function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        else{
            if(req.headers.language == "EN"){
                res.status(200).json({
                    description: result[0].description_en,
                    cover: result[0].cover
                })
            }
            else{
                res.status(200).json({
                    description: result[0].description,
                    cover: result[0].cover
                })
                
            }
        }
    })
}

exports.getHome = getHome;