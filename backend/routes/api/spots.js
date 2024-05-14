const express = require('express');
// want to make sure user is signed in
const { Sequelize } = require('sequelize');
const { Spot } = require('../../db/models');
const router = express.Router();

//find spots belonging to one person
router.get('/:id', async (req,res)=>{
    //need to check for authenticated user
    const spots = await Spot.findAll({
        where: {
            ownerId: req.query.id
        },
    });
    res.json(spots);
});
// find all spots
router.get('/', /*middleware maybe*/ async (req,res)=>{
    const allSpots = await Spot.findAll();
    res.json(allSpots);
});
module.exports = router;
