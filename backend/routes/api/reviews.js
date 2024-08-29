const express = require('express');
const { Review, ReviewImage, User } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth, authErrorCatcher } = require('../../utils/auth');

const router = express.Router();


//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { user } = req;
    const { url } = req.body;
    const review = await Review.findByPk(req.params.reviewId);


    if (!review) {
        res.status(404);
        res.body = { message: "Review couldn't be found" };
        return res.json(res.body);
    };

    if(review){
        const belongsToUser = Review.findOne({
            where: {
                id: req.params.reviewId,
                userId: user.id
            }
        });
        if(!belongsToUser){
            res.status(403);
            return res.json({message: "Forbidden"})
        };
    };

    const imgArr = await ReviewImage.findAll({
        where: {
            reviewId: req.params.reviewId
        }
    });

    if (imgArr.length >= 10) {
        res.status(403);
        res.body = { message: "Maximum number of images for this resource was reached" };
        return res.json(res.body);
    };

    let newImg;
    if (review && imgArr.length < 10) {
        newImg = await ReviewImage.create({
            reviewId: req.params.reviewId,
            url
        });
        return res.json(newImg);
    };

    return res.json(newImg);
});


//get reviews of current user
router.get('/current',requireAuth, async (req, res) => {
    const { user } = req;
    const reviews = await Review.findAll({
        where: {
            userId: user.id
        }
    });
    return res.json(reviews);
});


//edit a review
router.put('/:reviewId', requireAuth, async (req, res) => {
    let currRev = await Review.findByPk(req.params.reviewId);
    const { user } = req;
    if (!currRev) {
        res.status(404);
        res.body = {
            message: "Review couldn't be found"
        };
        return res.json(res.body)
    };
    if(currRev.userId !== user.id){
        res.status(403);
        return res.json({message: "Forbidden"})
    };

    let revObj = {
        review,
        stars,
    } = req.body;

    if(Object.keys(revObj).length === 0){
        res.status(400);
            res.body = {
                "message": "Bad Request",
                "errors": {
                    "review": "Review text is required",
                    "stars": "Stars must be an integer from 1 to 5",
                }
            };
            return res.json(res.body);
    };

    for (let key in revObj) {
        if (revObj[key] === undefined || revObj[key] === '') {
            res.status(400);
            res.body = {
                "message": "Bad Request",
                "errors": {
                    "review": "Review text is required",
                    "stars": "Stars must be an integer from 1 to 5",
                }
            };
            return res.json(res.body);
        };
    };

    await currRev.set({
        review: revObj.review,
        stars: revObj.stars
    });
    await currRev.save();

    // res.body = currRev;
    return res.json(currRev);
});

//delete a review
router.delete('/:reviewId', requireAuth, async(req,res)=>{
    const review = await Review.findByPk(req.params.reviewId);
    const { user } = req;
    if(!review){
        res.status(404);
        res.body = {
            message: "Review couldn't be found"
        };
        return res.json(res.body);
    };
    if(review.userId !== user.id){
        res.status(403);
        return res.json({message: "Forbidden"});
    };

    await review.destroy();
    return res.json({message: "Successfully deleted"});
});

//get all reviews
router.get('/all', async (req,res)=>{
    const reviews = await Review.findAll({
        where: {},
        include: [{
                model: User,
                through: User.id
            }]
    });
    let obj = {};
    reviews.forEach(el => {
        obj[el.id] = el;
    });
    res.status(200);
    return res.json(obj);
})

//get literally all reviews
router.get('/allSpots', async (req,res)=>{
    const reviews = await Review.findAll({});

    let obj = {};
    reviews.forEach(el=>{
        obj[el.id] = el;
    })
    res.status(200);
    return res.json(obj)
});

//get all reviews of current user
router.get('/', requireAuth, async (req, res) => {
    const { user } = req;
    const reviews = await Review.findAll({
        where: {
            userId: user.id
        }
    });
    res.json(reviews)
});



router.use(authErrorCatcher);
module.exports = router;
