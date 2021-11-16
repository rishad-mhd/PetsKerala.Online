const Collection = require('../Config/Collection')
const db = require('../Config/Connection')
const bcrypt = require('bcrypt');
const objectId =require('mongodb').ObjectId


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
                if (!user.googleId) {
                    bcrypt.compare(userDetails.password, user.password).then((status) => {
                        if (status) {
                            response.user = user
                            // response.status = true
                            resolve(response)
                        } else {
                            reject({/*status:false,*/message: "Incorrect password" })
                            console.log("Login failed");
                        }
                    })
                } else {
                    reject({ message: "You have must login with google" })
                }
            } else {
                // resolve({status:false})
                reject({ message: "Email doesn't match" })
            }
        })
    },
    userSignup: (userDetails) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(Collection.USER_COLLECTION).findOne({ email: userDetails.email })
            console.log("user", user);
            if (user) {
                resolve({ userExist: true })
            } else {
                userDetails.password = await bcrypt.hash(userDetails.password, 10)
                db.get().collection(Collection.USER_COLLECTION).insertOne(userDetails).then((response) => {
                    response.userExist = false
                    resolve(response)
                })
            }
        })
    },
    createPost: (postDetails, userId) => {
        console.log(postDetails, userId);
        return new Promise((resolve, reject) => {
            db.get().collection(Collection.PETS_COLLECTION)
                .insertOne({
                    name: postDetails.name,
                    price: postDetails.price,
                    userId,
                    category: postDetails.category,
                    date: postDetails.date,
                    description:postDetails.description,
                    phone:postDetails.phone
                }).then((data) => {
                    resolve(data)
                    console.log(data);
                })
        })
    },
    updateImageData: (name, id) => {
        console.log(name);
        return new Promise((resolve, reject) => {
            db.get().collection(Collection.PETS_COLLECTION).updateOne({ _id: id },
                {
                    $set: {
                        image: name
                    }
                })
        })
    },
    getAllPets: (limit) => {
        console.log(limit);
        return new Promise(async (resolve, reject) => {
            let allPets
            allPets = await db.get().collection(Collection.PETS_COLLECTION).find().limit(parseInt(limit)).sort({ date: -1 }).toArray()
            console.log(allPets);
            resolve(allPets)
        })
    },
    searchByname: () => {
        return new Promise((resolve, reject) => {
            db.get().collection(Collection.PETS_COLLECTION).find().toArray()
                .then((response) => {
                    resolve(response)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    getSelectedPet: (id) => {
        return new Promise((resolve, reject) => {
            let pet = db.get().collection(Collection.PETS_COLLECTION).findOne({ _id: objectId(id) })
                .catch((err) => reject(err))
            resolve(pet)
        })
    }
}