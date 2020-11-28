const roulette = require("../models/roulette.js"); 


const getRoulette = (req, res) => {
    roulette.find(function (err, rooms) {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(rooms); 
    })
}

const getPoints = (req, res) => {
    roulette.find(function(err, points){
        if (err){
            res.status(400).send(err, points);
        }
        numbers = []
        probs = []

        for (let index = 0; index < points[0].prizes.length; index++) {
           let n = parseInt(points[0].prizes[index].value)
           let p = parseFloat(points[0].prizes[index].probability)
        numbers.push(n);
        probs.push(p);
        }
        let valor = Math.random().choice(numbers, probs, size=1)
        res.status(200).json(valor); 

    })
}

/* const addRoulette = (req, res) =>{
    const newRoulette = new roulette({
        prizes: req.body.prizes,
        items: req.body.cover,
    })

    newRoulette.save(function(err,museum){
        if (err){
            res.status(400).send(err);
        }
        res.status(200).json(museum)
    })
}
 */
exports.getRoulette = getRoulette;
exports.getPoints = getPoints;
/* exports.addRoulette = addRoulette;  */