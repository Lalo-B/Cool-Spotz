const express = require('express');
const { setTokenCookie, restoreUser, requireAuth, authErrorCatcher } = require('../../utils/auth');
const { SpotImage } = require('../../db/models');
const router = express.Router();


router.delete('/:spotImageId', requireAuth, async (req,res)=>{
    const img = await SpotImage.findByPk(req.params.spotImageId);
    if(!img){
        res.status(404);
        res.body = {
            message: "Spot Image couldn't be found"
        };
        return res.json(res.body);
    };

    await img.destroy();
    return res.json({message: "Successfully deleted"})
});

router.use(authErrorCatcher);

module.exports = router;
