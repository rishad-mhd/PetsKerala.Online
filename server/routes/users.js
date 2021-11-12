var express = require('express');
const passport = require('passport');
const { isAuthenticateduser } = require('../Config/Auth');
const UserHelpers = require('../Helpers/UserHelpers');
var router = express.Router();
require('../Config/passport')


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
  (req, res, next) => {
    if (req.user) {
      res.redirect(successLoginUrl)
    }
  }
)

router.get('/auth/user', isAuthenticateduser, (req, res) => {
  console.log(req.user);
  res.json({ name: req.user.name })
})

router.get('/auth/user/logout', (req, res) => {
  req.session.destroy()
  res.send('logout')
})

router.post('/auth/signup', (req, res) => {
  UserHelpers.userSignup(req.body).then((response) => {
    console.log(response);
    if (response.userExist) {
      res.status(409).send("User already Exist")
    } else {
      let user= {
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        id:req.body._id
      }
      req.logIn(user, err => {
        if(err) throw err;
        console.log(req.user);
        res.json({name:req.user.name})
      })

    }
  })
})


router.post('/auth/login',(req,res,)=>{
  UserHelpers.userLogin(req.body)
  .then((response)=>{
    console.log(response);
    req.logIn(response.user, err => {
      if(err) throw err;
      console.log(req.user);
      res.json({name:req.user.name})
    })
  })
  .catch((err) => {
    res.status(401).send(err);
  })
})




module.exports = router;
