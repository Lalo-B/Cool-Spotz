const express = require('express');
const { Review } = require('../../db/models');


const router = express.Router();

//get reviews of current user
router.get('/current', async (req,res)=>{
    const { user } = req;
    const reviews = await Review.findAll({
        where: {
            userId: user.id
        }
    });
    return res.json(reviews);
});


//get all reviews by a spots id
router.get('/:spotId', async (req,res)=>{
    const reviews = await Review.findAll({
        where: {
            id: req.query.spotId
        }
    });
    if(!reviews){
        res.status(404);
        res.header('content-type', 'application/json');
        res.body({ messgae: "Spot couldn't be found"});
        return res.json(res.body);
    };
    return res.json(reviews);
});

//create a review for a spot based on the spots id
router.post('/:spotId', async (req,res)=>{
    const body = req.body;
    if(!body.review || typeof (body.stars) !== number){
        res.status(400);
        res.header('content-type', 'application/json');
        res.body = {
            messgae: 'Bad Request',
            errors: {
                review: 'Review text is required',
                stars: 'Stars must be an integer from 1 to 5'
            }
        }
    }
    const newReview = Review.create({
        userId: req.user.id,
        spotId: req.query.spotId,
        review: body.review,
        stars: body.stars
    });
    return res.json(newReview)
})


//get all reviews of current user
router.get('/', async (req,res)=>{
    const {user} = req;
    const reviews = await Review.findAll({
        where: {
            userId: user.id
        }
    });
    res.json(reviews)
});


module.exports = router;
