const express = require('express');
// want to make sure user is signed in
const { Sequelize } = require('sequelize');
// const { check } = require('express-validator');
// const { validateLogin } = require('./session');
const { Spot, SpotImage, User } = require('../../db/models');
const router = express.Router();

//Get all Spots owned by the Current User
router.get('/current', async (req,res)=>{
    const { user } = req;
    // console.log(req);
    const spots = await Spot.findAll({
        where: {
            ownerId: user.id
        },
    });
    return res.json(spots);
});


// add an image to a spot based on the spots id
router.put('/:spotId/images', async (req,res)=>{
    const newImg = req.body.url;
    const spot = await Spot.findByPk(req.query.spotId);
    // spot.
    // check the association here cuz spot doesnt have it
    // the spot image table has it
    res.body = {
        url: newImg,
        preview: true
    }
    return res.json(res.body);
})


// get details for a spot from an id
router.get('/:spotId', async (req,res)=>{
    console.log(req.query.spotId);
    const spotInfo = await Spot.findAll({
        where: {
            id: req.query.spotId
        },
        include: [{
            model: SpotImage,
            through: Spot.id,
            attributes: ['id','url','preview']
        },
        {
            model: User,
            through: User.id,
            // as: 'Owner',
            attributes: ['id','firstName','lastName']
        }]
    })
    if(!spotInfo){
        res.status(404);
        return res.json({
            message: "Spot couldn't be found"
        })
    };
    res.body = {
        spotInfo,
        SpotImages: SpotImage,
        Owner: User,
    }
    return res.json(res.body);
});



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
    return res.json(newSpot);
});

//delete spot by id
router.delete('/:spotId', async (req,res)=>{
    const thisOne = await Spot.findByPk(req.query.spotId);
    if(!thisOne){
        res.status(404);
        throw new Error('Spot couldn\'t be found');
    };
    await thisOne.destroy();
    return res.json({
        message: "successfully deleted"
    });
});




// find all spots
router.get('/', /*middleware maybe*/ async (req,res)=>{
    const allSpots = await Spot.findAll();
    return res.json(allSpots);
});


module.exports = router;
