var express = require('express');
const passport = require('passport');
const { isAuthenticateduser } = require('../Config/Auth');
const UserHelpers = require('../Helpers/UserHelpers');
var router = express.Router();
require('../Config/passport')
var fs = require('fs')
var cron = require('node-cron')


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
      // res.send("")
      res.redirect(successLoginUrl)
    }
  }
)

router.get('/auth/user', isAuthenticateduser, (req, res) => {
  console.log(req.user);
  UserHelpers.getUserDetails(req.user._id || req.user.id).then((response) => {
    console.log(response);
    user = {
      id: response._id,
      name: response.name,
      email: response.email,
      phone: response.phone,
      photo: response.picture,
      place: response.place,
      phone: response.phone,
      image: response.image,
    }
    res.send(user)
  }).catch((err) => console.log(err))
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
        user = {
          name: req.user.name,
          email: req.user.email,
          phone: req.user.phone,
        }
        res.send(user)
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
        user = {
          name: req.user.name,
          email: req.user.email,
          phone: req.user.phone,
          place: req.user.place || ""
        }
        res.send(user)
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
    let date = new Date()
    cron.schedule('0 0 1 * *', () => {
      let now = new Date();
      if (now - date < 30 * 24 * 60 * 60 * 1000) {
        return
      }
      imageName.forEach((obj) => {
        fs.unlink(`./public/images/${obj}`, (err) => {
          console.log(err);
        })
      })
    });

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

router.get('/category', (req, res) => {

  UserHelpers.getCategorisedPets(req.query)
    .then((response) => res.send(response))
    .catch((err) => {
      console.log(err);
    })
})

router.get('/user-posts', (req, res) => {
  UserHelpers.getUserPosts(req.user._id)
    .then((response) => res.json(response))
    .catch((err) => console.log(err))
})

router.post('/editPost', (req, res) => {
  let postDetails = JSON.parse(req.body.postDetails)
  console.log(postDetails);
  console.log(req.files);
  UserHelpers.getSelectedPet(postDetails.id)
    .then((response) => {
      if (req.files) {
        response.image.forEach((obj) => {
          fs.unlink(`./public/images/${obj}`, (err) => {
            console.log(err);
          })
        })
      }
    })
  UserHelpers.editPost(postDetails)
    .then((response) => {
      let imageName = []
      let imageFile = req.files ? req.files.image : null
      if (imageFile) {
        if (Array.isArray(imageFile)) {
          for (let i = 0; i < imageFile.length; i++) {
            imageName.push(postDetails.id + imageFile[i].name)
            console.log(imageFile[i]);
            imageFile[i].mv(`./public/images/${postDetails.id + imageFile[i].name}`, (err) => {
              if (err) {

                res.status(500).send(err);

              }
            })
          }
        } else {
          console.log('not array');
          imageName.push(postDetails.id + imageFile.name)
          imageFile.mv(`./public/images/${postDetails.id + imageFile.name}`, (err) => {
            if (err) {

              res.status(500).send(err);

            }
            imageName.push(postDetails.id + imageFile.name)
          })
        }
        let date = new Date()
        cron.schedule('0 0 1 * *', () => {
          let now = new Date();
          if (now - date < 30 * 24 * 60 * 60 * 1000) {
            return
          }
          imageName.forEach((obj) => {
            fs.unlink(`./public/images/${obj}`, (err) => {
              console.log(err);
            })
          })
        })
        UserHelpers.updateImageData(imageName, postDetails.id)
          .then((response) => console.log(response))
          .catch((err) => console.log(err))
      }
      res.json({ message: "Post Edited" })
    })
    .catch((err) => console.log(err))
})

router.get('/delete-post', (req, res) => {
  console.log(req.query);
  UserHelpers.getSelectedPet(req.query.id)
    .then((response) => {
      response.image.forEach((obj) => {
        fs.unlink(`./public/images/${obj}`, (err) => {
          console.log(err);
        })
      })

      UserHelpers.deletePost(req.query.id)
        .then((response) => res.send(response))
        .catch((err) => res.status(500).send(err))
    })
})

router.put('/update-user', (req, res) => {
  let userDetails
  if (req.body.userDetails) {
    userDetails = JSON.parse(req.body.userDetails)
    UserHelpers.updateUser(userDetails)
      .then((response) => {
        res.send(response)
      })
      .catch((err) => console.log(err))
  }

})

router.put('/update-user-image', (req, res) => {
  console.log(req.user);
  if (req.files) {
    console.log(req.files);
    let image = req.files.image
    image.mv(`./public/userImages/${req.user._id + '.jpg'}`, (err) => {
      if (err) {

        res.status(500).send(err);

      }

    })
    UserHelpers.updateUserImage(req.user._id)
      .then((response) => {
        res.send(response)
      })
      .catch((err) => console.log(err))
  }
})

router.get("/seller", (req, res) => {
  console.log(req.query);
  UserHelpers.getSellerDetails(req.query.id)
    .then((response) => res.send(response))
    .catch((err) => res.send(err))
})


router.get('/all-images', (req, res) => {
  const dirnameExportImg = './public/images'
  fs.readdir(dirnameExportImg, function (err, files) {
    if (err) {
      console.log(err)
    }
    res.send(files)
    files.map(
      (file) => { console.log(file) }
    )
  })
})

module.exports = router;
