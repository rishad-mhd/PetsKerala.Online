const Collection = require('../Config/Collection')
const db = require('../Config/Connection')
const bcrypt = require('bcrypt');


module.exports = {
    findOrCreate: (googleId, userDetails) => {
        console.log("userd", userDetails.default.email);
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(Collection.USER_COLLECTION).findOne({ email: userDetails.default.email })
            console.log("user", user);
            if (user) {
                resolve(user)
            } else {
                db.get().collection(Collection.USER_COLLECTION).insertOne(userDetails.default).then((data) => {
                    console.log("data", data);
                    resolve(data)
                })
            }
        })
    },
    userLogin: (userDetails) => {
        let response = {}
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(Collection.USER_COLLECTION).findOne({ email: userDetails.email })
            if (user) {
                bcrypt.compare(userDetails.password, user.password).then((status) => {
                    if (status) {
                        response.user = user
                        // response.status = true
                        resolve(response)
                    }else{
                        reject({/*status:false,*/message:"Incorrect password"})
                        console.log("Login failed");
                    }
                })
            }else{
                // resolve({status:false})
                reject({message:"Email doesn't match"})
            }
        })
    },
    userSignup: (userDetails)=>{
        return new Promise(async(resolve,reject)=>{
            let user =await db.get().collection(Collection.USER_COLLECTION).findOne({email:userDetails.email})
            console.log("user",user);
            if(user){
                resolve({userExist:true})
            }else{
                userDetails.password = await bcrypt.hash(userDetails.password,10)
                db.get().collection(Collection.USER_COLLECTION).insertOne(userDetails).then((response)=>{
                    response.userExist=false
                    resolve(response)
                })
            }
        })
    }
}