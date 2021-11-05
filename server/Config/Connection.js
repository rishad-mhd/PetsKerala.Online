const mongoClient = require('mongodb').MongoClient;

const state = {
  db: null
}

module.exports.connect = (done) => {
  const url = 'mongodb://localhost:27017'
  const dbname = 'pets'

  mongoClient.connect(url,(err,data)=>{

    if(err) done(err)
    state.db = data.db(dbname)
    done()

  })
}

module.exports.get=function(){
  return state.db
}