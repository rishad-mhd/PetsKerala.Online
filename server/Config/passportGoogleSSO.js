const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('./Config')

passport.use(new GoogleStrategy({
    clientID: config.googleConfig.GOOGLE_CLIENT_ID,
    clientSecret: config.googleConfig.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/users/google/callback",
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {

    const defaultUser = {
        fullname: `${profile.name.givenName}  ${profile.name.familyName}`,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        googleId: profile.id
    }
    // const user = await User.findOrCreate({ where: { googleId: profile.id }, default: defaultUser }).catch((err) => {
        // console.log('Error ', err);
        // done(err,null)
    // })
    // if(user && user[0]){
        return done(null,profile)
    // }

}))

passport.serializeUser(function(user,done){
    // console.log("Serializing users:",user);
    done(null,user)
})

passport.deserializeUser(function(user,done){
    done(null,user)
})

