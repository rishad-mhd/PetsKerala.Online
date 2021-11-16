const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Config = require('./Config')
const UserHelpers = require('../Helpers/UserHelpers')

passport.use(new GoogleStrategy({
    clientID: Config.GOOGLE_CLIENT_ID,
    clientSecret: Config.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/users/google/callback",
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {

    const defaultUser = {
        name: profile.displayName,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        googleId: profile.id
    }

    const user = await UserHelpers.findOrCreate({ googleId: profile.id }, { default: defaultUser }).catch((err) => {
        console.log('Error ', err);
        return done(err, null)
    })
    if (user && user !== null) {
        const userdetails = {
            _id:user.insertedId || user._id,
            name: profile.displayName,
            email: profile.emails[0].value,
            picture: profile.photos[0].value,
            googleId: profile.id
        }
        return done(null, userdetails)
    }

}))



passport.serializeUser(function (user, done) {
    console.log("Serializing users:", user);
    done(null, user)

})

passport.deserializeUser(function (user, done) {
    console.log("as");
    done(null, user)
})

