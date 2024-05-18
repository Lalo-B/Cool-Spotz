const express = require('express');
const { setTokenCookie, restoreUser, requireAuth, authErrorCatcher } = require('../../utils/auth');
const { ReviewImage } = require('../../db/models');
const router = express.Router();


router.delete('/:reviewImageId', requireAuth, async (req,res)=>{
    const img = await ReviewImage.findByPk(req.params.reviewImageId);
    if(!img){
        res.status(404);
        res.body = {
            message: "Review Image couldn't be found"
        };
        return res.json(res.body);
    };

    await img.destroy();
    return res.json({message: "Successfully deleted"});
});


router.use(authErrorCatcher);
module.exports = router;
