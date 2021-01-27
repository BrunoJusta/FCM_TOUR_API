const roulette = require("../models/roulette.js");
const { getRoomsByNumber } = require("./tower.js");


const getRoulette = (req, res) => {
    roulette.find(function (err, rooms) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(rooms);
    })
}

const getPoints = (req, res) => {
    roulette.find(function (err, points) {
        if (err) {
            res.status(400).send(err, points);
        }
        numbers = []
        probs = []
        total = []
        let nTimes;

        for (let index = 0; index < points[0].prizes.length; index++) {
            let n = parseInt(points[0].prizes[index].value)
            let p = parseFloat(points[0].prizes[index].probability)
            numbers.push(n);
            probs.push(p);
        }
        for (let j = 0; j < probs.length; j++) {
            nTimes = probs[j]
            for (let k = 0; k < nTimes; k++) {
                total.push(numbers[j])
            }
        }
        let award = total[Math.floor(total.length * Math.random())];
        res.status(200).json({award: award});

    })
}

const getItems = (req, res) => {
    roulette.find(function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        else{
            let items = []
            let prizes = result[0].items
            for (let i = 0; i < prizes.length; i++) {
                if(req.headers.language == "EN"){
                    items.push({
                        number:prizes[i].number,
                        img:prizes[i].img,
                        name:prizes[i].name_en,
                        price:prizes[i].price
                    })
                }
                else{
                    items.push({
                        number:prizes[i].number,
                        img:prizes[i].img,
                        name:prizes[i].name,
                        price:prizes[i].price
                    })
                }
            }
            res.status(200).json(items);
        }
    })
}

const getItemsByNumber = (req, res) => {
    roulette.find({
        roulette
    }, function (err, results) {
        if (err) {
            res.status(400).send(err);
        }else{
            
            let items = results[0].items
            for(let i = 0; i< items.length; i++){
                if( items[i].number == req.params.number){
                    if(req.headers.language == "EN"){
                        res.status(200).json({
                            number:items[i].number,
                            img:items[i].img,
                            name:items[i].name_en,
                            price:items[i].price
                        })
                    }
                    else{
                        res.status(200).json({
                            number:items[i].number,
                            img:items[i].img,
                            name:items[i].name,
                            price:items[i].price
                        })
                    }
                }
            }
        }
    })
}

exports.getRoulette = getRoulette;
exports.getPoints = getPoints;
exports.getItems = getItems;
exports.getItemsByNumber = getItemsByNumber;