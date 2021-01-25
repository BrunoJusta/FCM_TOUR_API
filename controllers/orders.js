const order = require('../models/orders.js')
const cart = require('../models/cart.js')
const nodemailer = require('nodemailer');
const sendgridTransporter = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport(
    sendgridTransporter({
        auth: {
            api_key: process.env.EMAIL_TRANSPORTER
        }
    }));

const addOrder = (req, res) => {
    order.find(function (err, orders) {
        let info = req.body[0]
        let list = req.body[1]
        if (err) {
            res.status(400).send(err);
        } else {
            let newNum
            if (orders.length == 0) newNum = 1
            else newNum = orders[orders.length - 1].number + 1
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
                        if (res) {
                            transporter.sendMail({
                                to: req.params.email,
                                from: "fcmESMAPP@outlook.com",
                                subject: "FCM Tour - Encomenda nº" + newNum,
                                html: `<img style="width: 120px; height: 120px;" src="https://firebasestorage.googleapis.com/v0/b/fcmtour-347cf.appspot.com/o/images%2Flogo.png?alt=media&token=7a03772d-5967-4a75-ab11-a230e3e44cb9%22%3E">
                                <h1 style="font-family: Arial, Helvetica, sans-serif;">FCM TOUR</h1>
                                <h2 style="font-family: Arial, Helvetica, sans-serif;">Encomenda nº${newNum}</h2>
                                <p style="font-family: Arial, Helvetica, sans-serif; color: gray;">Olá ${info.name}, caso ainda não tenha efetuado o pagamento, a sua encomenda será processada após a receção do mesmo (Dispõe de 24h, caso contrário será automaticamente cancelada).
                                Enviaremos email assim que a sua encomenda for processada!</p>
                                <h3 style="font-family: Arial, Helvetica, sans-serif;">TOTAL A PAGAR: ${info.total}€</h3>`
                            }, function (err, result) {
                                if (err) {
                                    res.status(404).send(err)
                                }
                                if (result) {
                                    cart.deleteMany({
                                        email: req.params.email
                                    }, function (err, results) {
                                        if (err) {
                                            res.status(400).send(err);
                                        }
                                        if (results) {
                                            res.status(200).json([{
                                                res: "Encomenda Registada!",
                                                state: 0
                                            }]);
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}


const getOrdersByUser = (req, res) => {
    order.find({
        email: req.params.email
    }, function (err, result) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).json(result);
        }
    })
}

const getOrdersByID = (req, res) => {
    order.findOne({
        number: req.params.id
    }, function (err, result) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).json(result);
        }
    })
}

exports.addOrder = addOrder
exports.getOrdersByUser = getOrdersByUser
exports.getOrdersByID = getOrdersByID