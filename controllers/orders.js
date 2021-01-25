const order = require('../models/orders.js')


const addOrder = (req, res) => {

    order.find(function (err, orders) {
        let info = req.body[0]
        let list = req.body[1]
        if (err) {
            res.status(400).send(err);
        }
        else{
            let newNum
            if(orders.length == 0) newNum = 1
            else newNum = orders[orders.length-1].number + 1
            const orderToCreate = new order({
                number: newNum,
                email: req.params.email,
                name: info.name,
                adress: info.adress,
                zipCode: info.zipCode,
                city: info.city,
                total: info.total,
                products: list.products,
                state: 0
            });

            order.find(function (err, user) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    orderToCreate.save(function (err, newUser) {
                        if (err) {
                            res.status(400).send(err);
                        }
                        res.status(200).json({
                            res: "Encomenda Registada!"
                        });
                    })
                }
            })
        }
    })
}


const getOrdersByUser = (req, res) => {
    order.find({email: req.params.email}, function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        else{
            res.status(200).json(result);
        }
    })
}

const getOrdersByID = (req, res) => {
    order.findOne({number: req.params.id}, function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        else{
            res.status(200).json(result);
        }
    })
}

exports.addOrder = addOrder
exports.getOrdersByUser = getOrdersByUser
exports.getOrdersByID = getOrdersByID
