const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const {jwtAuthMiddleware, generateToken}=require('../jwt')

// const comparePassword=require('../auth')

// Create a mongoose Schema***********************
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    work: {
        type: String,
        required: true,
        default: ['chef', 'manager', 'waiter']
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },


    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});


// Password Hashing*******************************************************
personSchema.pre('save', async function (next) {

    const person = this;

    //Hash the password only if it has been modified or is new      
    if (!person.isModified('password')) return next();

    try {
        //Hash Password generation 
        const salt = await bcrypt.genSalt(10); 
 
        //Has password
        const hashPassword = await bcrypt.hash(person.password, salt);

        //Override the plane the plane  password with the hashed one
        person.password = hashPassword;

        next();
    }
    catch (err) {
        return next(err);
    }

});

// password Schema***********************************
personSchema.method.comparePassword = async function (candidatePassword,hashPassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, hashPassword);
        return isMatch;
    }
    catch (err) {
        throw (err);
    }
}


// Create a mongoose Model*******************************
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
 