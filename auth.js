const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt= require('bcrypt');

const Person = require('./models/person')


// Create a Authentication Middle ware
passport.use(new localStrategy(async (username, passwword, done) => {
    //Authentication Logic Here
    try {
        // console.log('Recived Credential:');

        const user = await Person.findOne({ username: username });
        if (!user)
            return done(null, false, { message: 'Incorrect username.' });

        const isPasswordMatch =await bcrypt.compare(passwword,user.password);

        if (isPasswordMatch) {
            return done(null, user);
        }
        else {
            return done(null, false, { message: "Incorrect Password." })
        }

    }
    catch (err) {
        return done(err);
    }
}))

module.exports=passport;

