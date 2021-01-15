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
                res.status(200).json({
                    state: "Ticket criado"
                });
            })
        } else {
            res.status(400).json({
                state: "Ticket já existe"
            });
        }
    })
}

const getTicketByCode = (req, res) => {
    tickets.find({
        code: req.params.code
    }, function (err, ticket) {
        if (err) {
            res.status(400).send(err);
        }
        if (ticket) {
            console.log(ticket)
            const fullDate = new Date()
            const date = fullDate.getFullYear() + '/' + (fullDate.getMonth() + 1) + '/' + fullDate.getDate();
            console.log(ticket)
            if (ticket.length == 0) {
                res.status(200).json({
                    state: "Ticket não autorizado"
                });
            }
            else if (ticket[0].date == date) {
                res.status(200).json({
                    state: "Ticket válido",
                    code: req.params.code
                });
            } else {
                res.status(200).json({
                    state: "Ticket não autorizado"
                });
            }
        }
    })
}

exports.generateTicket = generateTicket;
exports.getTicketByCode = getTicketByCode;