const express = require('express');
// want to make sure user is signed in
const { Sequelize } = require('sequelize');
const { Spot } = require('../../db/models');
const router = express.Router();


router.get('/:spotId', async (req,res)=>{
    //need to check for authenticated user
    const spot = await Spot.findByPk(req.params.spotId)
    if(!spot){
        res.status(404);
        return res.json({
            message: "Spot couldn't be found"
        })
    }
    res.json(spot);
});

router.put('/:spotId', async (req,res)=>{
    const {} = req.body
})

router.post('/', async (req,res)=>{
    const {
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    } = req.body;

    const newSpot = await Spot.create({
        ownerId: ownerId,
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: "$"+ price
    });
    res.status(201)
    res.json(newSpot);
});

router.delete('/:id', async (req,res)=>{
    const thisOne = await Spot.findByPk(req.query.id);
    if(!thisOne){
        res.status(404);
        throw new Error('Spot with this id does not exist');
    };
    await thisOne.destroy();
    res.json({
        message: "successfully deleted"
    });
});

//find spots belonging to one person
router.get('/:id', async (req,res)=>{
    //need to check for authenticated user
    const spots = await Spot.findAll({
        where: {
            ownerId: req.query.id
        },
    });
    res.json(spots);
});
// find all spots
router.get('/', /*middleware maybe*/ async (req,res)=>{
    const allSpots = await Spot.findAll();
    res.json(allSpots);
});
module.exports = router;




