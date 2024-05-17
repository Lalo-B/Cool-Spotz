const express = require('express');
const { Booking } = require('../../db/models');
const router = express.Router();




//delete a booking
router.delete('/:bookingId', async (req,res)=>{
    const id = req.params.id;
    const booking = Booking.findByPk(id);
})


//get bookings for current user
router.get('/current', async (req,res)=>{
    const {user} = req;
    const all = await Booking.findAll({
        where: {
            userId: user.id
        }
    });
    return res.json(all);
});


// get all bookings in booking table
router.get('/', async (req,res)=>{
    const all = Booking.findAll();
    res.json(all);
});


module.exports = router
