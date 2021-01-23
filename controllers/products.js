const product = require('../models/products.js')



const getProducts = (req, res) => {

    product.find(function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        else{
            res.status(200).json(result);
        }
    })
}

const getProductsbyPriceHigh = (req, res) => {
    product.find().sort({price:-1}).exec(function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        else{
            res.status(200).json(result);
        }
    })
}

const getProductsbyPriceLow = (req, res) => {
    product.find().sort({price:1}).exec(function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        else{
            res.status(200).json(result);
        }
    })
}

const getProductsbyID = (req, res) => {
    product.find({number: req.params.id}, function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        else{
            if(req.headers.language == "EN"){
                res.status(200).json({
                    number: result[0].number,
                    name: result[0].name,
                    price: result[0].price,
                    description: result[0].description_en,
                    img: result[0].img,
                });
            }
            else{
                res.status(200).json({
                    number: result[0].number,
                    name: result[0].name,
                    price: result[0].price,
                    description: result[0].description,
                    img: result[0].img,
                });
            }
            
        }
    })
}

const deleteProductsbyID = (req, res) => {
    product.deleteOne({number: req.params.id}, function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        else{
                res.status(200).json("removido");
        }
    })
}

exports.getProducts = getProducts;
exports.getProductsbyPriceHigh = getProductsbyPriceHigh;
exports.getProductsbyPriceLow = getProductsbyPriceLow;
exports.getProductsbyID = getProductsbyID;
exports.deleteProductsbyID = deleteProductsbyID;


