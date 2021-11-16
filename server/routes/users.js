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

router.get('/pets', (req, res) => {
  console.log(req.query)
  UserHelpers.getAllPets(req.query.limit).then((allPets) => {
    res.json(allPets)
  })


})

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
  console.log(req.body);
  UserHelpers.userSignup(req.body).then((response) => {
    console.log(response);
    if (response.userExist) {
      res.status(409).send("User already Exist")
    } else {
      let user = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        id: req.body._id
      }
      req.logIn(user, err => {
        if (err) throw err;
        console.log(req.user);
        res.json({ name: req.user.name })
      })

    }
  })
})


router.post('/auth/login', (req, res,) => {
  UserHelpers.userLogin(req.body)
    .then((response) => {
      console.log(response);
      req.logIn(response.user, err => {
        if (err) throw err;
        console.log(req.user);
        res.json({ name: req.user.name })
      })
    })
    .catch((err) => {
      res.status(401).send(err);
    })
})


router.post('/createPost', (req, res) => {
  let postDetails = JSON.parse(req.body.postDetails)
  console.log(req.files);
  let imageFile = req.files.image
  let imageName = []
  UserHelpers.createPost(postDetails, req.user._id).then((data) => {
    if (Array.isArray(imageFile)) {
      for (let i = 0; i < imageFile.length; i++) {
        imageName.push(data.insertedId + imageFile[i].name)
        console.log(imageFile[i]);
        imageFile[i].mv(`./public/images/${data.insertedId + imageFile[i].name}`, (err) => {
          if (err) {

            res.status(500).send(err);

          }
        })
      }
    } else {
      console.log('not array');
      imageName.push(data.insertedId + imageFile.name)
      imageFile.mv(`./public/images/${data.insertedId + imageFile.name}`, (err) => {
        if (err) {

          res.status(500).send(err);

        }
        imageName.push(data.insertedId + imageFile.name)
      })
    }

    UserHelpers.updateImageData(imageName, data.insertedId)
    res.json({ message: "Post created" })
    console.log(data);
  })
})

router.get('/search', (req, res) => {
  console.log(req.query);
  let name = []
  UserHelpers.searchByname()
    .then((response) => {
      console.log(name);
      var matched_terms = [];
      var search_term = req.query.data;
      search_term = search_term.toLowerCase();
      response.forEach(item => {
        if (item.name.toLowerCase().indexOf(search_term) !== -1) {
          matched_terms.push(item);
        }
      })
      res.send(matched_terms)
    })
    .catch((err) => console.log(err))
})

router.get('/selected-pet', (req, res) => {
  UserHelpers.getSelectedPet(req.query.id)
    .then((response) => {
      res.json(response)
    }).catch((err) => {
      res.status(500).json(err)
    })
})



module.exports = router;
