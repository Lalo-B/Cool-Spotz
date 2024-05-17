const express = require('express');
const { Review } = require('../../db/models');


const router = express.Router();

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

router.post('/:spotId', async (req,res)=>{
    const body = req.body;
    const newReview = Review.create({
        body
    })
})


//get all reviews of current user
router.get('/', async (req,res)=>{
    const user = req.user;
    const reviews = await Review.findAll({
        where: {
            userId: user.id
        }
    });
    res.json(reviews)
});


module.exports = router;
