const tickets = require("../models/qrCode");


const generateTicket = (req, res) => {
    tickets.find({
        code: req.body.code
    }, function (err, ticket) {
        if (err) {
            res.status(400).send(err);
        }
        if (ticket.length == 0) {
            const fullDate = new Date()
            const date = fullDate.getFullYear() + '/' + (fullDate.getMonth() + 1) + '/' + fullDate.getDate();

            const ticketToCreate = new tickets({
                code: req.body.code,
                date: date
            });

            ticketToCreate.save(function (err, newTicket) {
                if (err) {
                    res.status(400).send(err);
                }
                res.status(200).send("Ticket criado");
            })
        } else {
            res.status(401).send("Ticket já existe");
        }
    })
}

const getTicketByCode = (req, res) => {
    tickets.find({
        code: req.body.code
    }, function (err, ticket) {
        if (err) {
            res.status(400).send(err);
        }
        if (ticket) {
            const fullDate = new Date()
            const date = fullDate.getFullYear() + '/' + (fullDate.getMonth() + 1) + '/' + fullDate.getDate();
            if (ticket[0].date == date) {
                res.status(401).send("Ticket válido");
            } else {
                res.status(401).send("Ticket não autorizado");
            }
        }
    })
}

exports.generateTicket = generateTicket;
exports.getTicketByCode = getTicketByCode;