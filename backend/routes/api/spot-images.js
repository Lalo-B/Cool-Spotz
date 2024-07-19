const express = require('express');
const { setTokenCookie, restoreUser, requireAuth, authErrorCatcher, doesOwnSpot } = require('../../utils/auth');
const { SpotImage, Spot } = require('../../db/models');
const router = express.Router();


router.get('/', async (req, res) => {
    const allImgs = await SpotImage.findAll();
    // console.log(allImgs)
    return res.json({
        'spotImgs': allImgs
    });
});

router.get('/:spotId', async (req,res) => {
    const {spotId} = req.params;
    const oneImg = await SpotImage.findByPk(spotId);
    return res.json({
        img: oneImg
    })
})


router.delete('/:spotImageId', requireAuth, async (req, res) => {
    // wants to delete 21
    const img = await SpotImage.findByPk(req.params.spotImageId);
    const { user } = req;  // does this need to be req.body??
    console.log(user.id);
    if (!img) {
        res.status(404);
        res.body = {
            message: "Spot Image couldn't be found"
        };
        return res.json(res.body);
    } else {
        const spot = await Spot.findOne({
            where: {
                id: img.spotId
            }
        });
        // console.log(spot.id);
        if (spot.ownerId !== user.id) {
            res.status(403);
            return res.json({ message: "Forbidden" })
        } else {
            await img.destroy();
            res.status(200);
            return res.json({ message: "Successfully deleted" });
        };
    };
});

router.use(authErrorCatcher);

module.exports = router;
