var express = require('express');
var router = express.Router();

// const pets =[{
//   id:1,
//   name:'Lab',
//   category:'Dog',
//   price:8000,
//   image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrZqTCInyg6RfYC7Ape20o-EWP1EN_A8fOA&usqp=CAU',
//   description:'Well trained dog'
// },
// {
//   id:2,
//   name:'Persian Cat',
//   category:'cat',
//   price:7000,
//   image:'https://vetstreet.brightspotcdn.com/dims4/default/798e68d/2147483647/crop/0x0%2B0%2B0/resize/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2Fe7%2Ff4d770a33211e087a80050568d634f%2Ffile%2FPersian-1-645mk062211.jpg',
//   description:'Well trained cat'
// },
// {
//   id:3,
//   name:'Hamster',
//   category:'Hamster',
//   price:8000,
//   image:'https://i.ytimg.com/vi/rkZ6gzyg7yY/maxresdefault.jpg',
//   description:'Breeding age'
// }]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PetsKerala' });
});

// router.get('/pets', (req,res)=>{
//   res.json(pets)
// })

module.exports = router;
