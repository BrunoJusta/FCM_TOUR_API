const cart = require('../models/cart.js')
const product = require('../models/products.js')


const addToCart = (req, res) => {

    product.find({
        number: req.params.product
    }, function (err, product) {
        if (err) {
            res.status(400).send(err);
        } else {
            console.log(product)

            const cartToCreate = new cart({
                email: req.params.email,
                number: product[0].number,
                name: product[0].name,
                price: product[0].price,
                img: product[0].img,
            });

            cart.find({
                email: req.params.email,
                number: req.params.product
            }, function (err, results) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    if (results.length == 0) {
                        cartToCreate.save(function (err, newCart) {
                            if (err) {
                                res.status(400).send(err);
                            }
                            res.status(200).json({
                                res: "Adicionado ao Carrinho!",
                                state: 1
                            });
                        })
                    } else {
                        res.status(200).json({
                            res: "Produto já adicionado ao Carrinho!",
                            state: 0
                        });
                    }
                }
            })
        }
    })
}


const getCartByUser = (req, res) => {
    cart.find({
        email: req.params.email
    }, function (err, result) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).json(result);
        }
    })
}

const deleteProductInCart = (req, res) => {
    cart.deleteOne({
        email: req.params.email,
        number: req.params.product
    }, function (err, result) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).json({
                res: "Produto Removido do carrinho!",
                state: 0
            });
        }
    })
}

exports.addToCart = addToCart
exports.getCartByUser = getCartByUser
exports.deleteProductInCart = deleteProductInCart