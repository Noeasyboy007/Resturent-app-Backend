const express = require('express');

const MenuItem = require('../models/menu');

const router = express.Router();

// Post method to Create the new Menu  Data
router.post('/', async (req, res) => {
    try {
        const data = req.body;

        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log('Menu Data saved :- By Post Method');
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server Error" })
    }
});


//Get method to get the menu data
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log("Response Fatched :- Get All Manu List");
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" })
    }
});

//Get Method To get Menu Iteam Taste 
router.get('/:taste', async (req, res) => {
    try {
        const taste = req.params.taste;
        if (taste == "sweet" || taste == "spicy" || taste == "soure") {
            const response = await MenuItem.find({ taste: taste });
            console.log('Response fetched :- Get Manu Iteam Taste');
            res.status(200).json(response);
        }
    } catch (error) {
        console.log(err);
        res.status(500).json({ error: "You Search Invalid Taste" })
    }
});

//Update Operation to Update Menu data
router.put('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const updateData = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuId, updateData, {
            new: true,//Return the Update Document
            runValidators: true//Run Mongoose Vaidations
        })

        console.log("Menu Data Updated"); 
        res.status(200).json(response)
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Error' });
    }
})


// Delete Operations to Delete Menu Data
router.delete('/:id', async (req, res) => {

    try {
        const menuId = req.params.id;

        //Assuming you have a person model
        const response = await MenuItem.findByIdAndDelete(menuId);

        console.log("Data Deleted");
        res.status(200).json({ message: "Menu Data Deleted Sucessfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Error" })
    }
})




module.exports = router;