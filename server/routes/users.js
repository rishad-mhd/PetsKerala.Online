var express = require('express');
const passport = require('passport');
const { isAuthenticateduser } = require('../Config/Auth');
var router = express.Router();
require('../Config/passportGoogleSSO')


const successLoginUrl = "http://localhost:3000/login-success";
const errorLoginUrl = 'http://localhost:3000/login/error'

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback',
  passport.authenticate('google', {
    failureMessage: "Cannot login to google try again later",
    failureredirect: errorLoginUrl,
  }),
  (req, res,next) => {
    if(req.user){
      res.redirect(successLoginUrl)
    }
  }
)

router.get('/auth/user',isAuthenticateduser,(req,res)=>{
  console.log("session",req.session);
  res.json({name: req.user.displayName})
})

router.get('/auth/user/logout',(req,res)=>{
  req.session.destroy()
  res.send('logout')
})

module.exports = router;
