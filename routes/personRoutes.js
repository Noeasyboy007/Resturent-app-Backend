const express = require('express');

const Person = require('../models/person');

const router = express.Router();

// Post method to Create the new person  Data
router.post('/', async (req, res) => {

    try {
        // Assuming the request body contains the person
        const data = req.body

        // Create a new person document using the mongoose model
        const newPerson = new Person(data);

        // Saved the new person to the database
        const response = await newPerson.save();
        console.log("Person Data Saved :- by post Method");
        res.status(200).json(response)

        
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

// Get method to get the person 
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log("Data Fatched :- Get All Person Data");
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" })
    }
});


// Get method to get person workType to data
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'manager' || workType == 'water') {
            const response = await Person.find({ work: workType });
            console.log('Response Fatched :-Get Person Work Type');
            res.status(200).json(response);
        }
        else {
            res.status(404).json({ error: "You Search Invalide Work Type" });
        }
    }
    catch (error) {
        console.log(err);
        res.status(500).json({ error: "Intrenal Error" });
    }
})



//Update operation to update person data
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedDta = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedDta, {
            new: true,//Return the Update Document
            runValidators: true, //Run Mongoose Vaidations
        })

        console.log("Person Data Updated"); 
        res.status(200).json(response);
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error'});
    }
})



//Delete operation to delete person data
router.delete('/:id',async(req,res)=>{
    try {
        const personId = req.params.id;//Extract The Person Id form the URL parameter

        //Assuming you have a person model
        const response = await Person.findByIdAndDelete(personId);

        console.log("Data Deleted");
        res.status(200).json({message: 'Person Deleted Sucessfully'});


    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal error"});
    }
})




module.exports = router;