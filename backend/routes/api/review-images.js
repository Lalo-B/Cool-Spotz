const express = require('express');
const { setTokenCookie, restoreUser, requireAuth, authErrorCatcher } = require('../../utils/auth');
const { ReviewImage, Review, User } = require('../../db/models');
const router = express.Router();


router.delete('/:reviewImageId', requireAuth, async (req, res) => {
    const { user } = req;
    const img = await ReviewImage.findByPk(req.params.reviewImageId);

    if (!img) {
        res.status(404);
        return res.json({message: "Review Image couldn't be found"});
    } else {
        const review = await Review.findOne({
            where: {
                id: img.reviewId,
                // include: [{
                //     model: User,
                //     where: {
                //         id: user.id
                //     }
                // }]
            }
        });
        if (review.userId !== user.id) {
            res.status(403);
            return res.json({ message: "Forbidden" });
        } else {
            res.status(200);
            await img.destroy();
            return res.json({ message: "Successfully deleted" });
        };
    };
});


router.use(authErrorCatcher);
module.exports = router;
