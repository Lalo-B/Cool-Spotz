const express = require('express');
const { Sequelize } = require('sequelize');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, User, Booking, Review } = require('../../db/models');
const router = express.Router();

//Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const spots = await Spot.findAll({
        where: {
            ownerId: user.id
        },
    });
    return res.json(spots);
});

//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const { spotId, userId, review, stars } = req.body;
    const { user } = req;
    const foundSpot = await Spot.findByPk(req.params.spotId);
    if(foundSpot === null){
    res.status(404);
    res.body = {message: "Spot couldn't be found"}
    return res.json(res.body);
    };

    const alreadyReview = Review.findAll({
        where: {
            spotId: req.params.spotId,
            userId: user.id
        }
    })
    if(alreadyReview){
        res.status(500);
        res.body = {message: "User already has a review for this spot"};
        return res.json(res.body);
    };

    if(spotId && userId && review && stars){
        const newR = await Review.create({
        spotId, userId, review, stars
    });
    } else {
        res.status(400);
        res.body = {
            "message": "Bad Request",
            "errors": {
                "review": "Review text is required",
                "stars": "Stars must be an integer from 1 to 5",
            }
        }
        return res.json(res.body);
    };
    res.status(201);
    res.body = {
        review, stars
    };
    return res.json(res.body);
});


//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const { user } = req;
    const spot = await Spot.findAll({
        where: {
            id: req.params.spotId
        },
        include: [{
            model: Booking,
            through: Booking.id
        }, {
            model: User,
            through: User.id
        }]
    });

    if (spot.length === 0) {
        res.status(404)
        return res.json({ message: 'Spot couldn\'t be found' })
    };

    Bookings = [];
    if (user.id === spot[0].ownerId) {
        spot.forEach(booking => {
            let actualB = booking.Bookings;
            let actualU = booking.User;
            const { id, spotId, userId, startDate, endDate, createdAt, updatedAt } = actualB[0];
            Bookings.push({
                User: { actualU },
                id, spotId, userId, startDate, endDate, createdAt, updatedAt
            });
        });
    } else {
        spot.forEach(booking => {
            const { spotId, startDate, endDate } = booking.Bookings[0];
            // console.log(booking.Bookings)
            Bookings.push({ spotId, startDate, endDate });
        });
    };
    res.body = { Bookings };

    return res.json(res.body);
});

// add an image to a spot based on the spots id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.id);
    if (spot === null) {
        res.status(404);
        res.body = { message: "Spot couldn't be found" }
        return res.json(res.body)
    };
    const newImg = req.body.url;
    const img = await SpotImage.create({
        spotId: req.params.spotId,
        url: newImg,
        preview: true
    });

    res.body = {
        id: img.id,
        url: img.url,
        preview: img.preview
    };
    return res.json(res.body);
});


// get details for a spot from an id
router.get('/:spotId', requireAuth, async (req, res) => {
    console.log(req.query.spotId);
    const spotInfo = await Spot.findAll({
        where: {
            id: req.query.spotId
        },
        include: [{
            model: SpotImage,
            through: Spot.id,
            attributes: ['id', 'url', 'preview']
        },
        {
            model: User,
            through: User.id,
            // as: 'Owner',
            attributes: ['id', 'firstName', 'lastName']
        }]
    })
    if (!spotInfo) {
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


// create new spot
router.post('/', requireAuth, async (req, res) => {
    let {
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

    let newSpot = await Spot.create({
        ownerId: ownerId,
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: "$" + price
    });

    res.status(201);
    return res.json(newSpot);
});

//delete spot by id
router.delete('/:spotId', requireAuth, async (req, res) => {
    const thisOne = await Spot.findByPk(req.query.spotId);
    if (!thisOne) {
        res.status(404);
        throw new Error('Spot couldn\'t be found');
    };
    await thisOne.destroy();
    return res.json({
        message: "successfully deleted"
    });
});




// find all spots
router.get('/', requireAuth, async (req, res) => {
    const allSpots = await Spot.findAll();
    return res.json(allSpots);
});


module.exports = router;
