import {db} from '../../config/database.js'
import {ObjectId} from 'mongodb'

class User {
    constructor(name, email, password, profilePicture = {url: undefined}) {
        this._id = ObjectId()
        this.name = name,
        this.email = email,
        this.password = password
        this.profilePicture = profilePicture
    }

    save() {
        return db.collection('users').insertOne(this)
    }

    static findUserByEmail(email) {
        return db.collection('users').findOne({email})
    }

    static findUserById(userId) {
        return db.collection('users').findOne({
            _id: new ObjectId(userId)
        })
    }

    static updateName(userId, updatedName) {
        return db.collection('users').updateOne(
            {_id: new ObjectId(userId)},
            {$set: {name: updatedName}}   
        )
    }

    static updateEmail(userId, updatedEmail) {
        return db.collection('users').updateOne(
            {_id: new ObjectId(userId)},
            {$set: {email: updatedEmail} }
        )
    }

    static updatePassword(userId, updatedPassword) {
        return db.collection('users').updateOne(
            {_id: new ObjectId(userId)},
            {$set: {password: updatedPassword}}
        )
    }

    static updateProfilePicture(userId, url) {
        return db.collection('users').updateOne(
            {_id: new ObjectId(userId)},
            {$set: {"profilePicture.url": url}}
        )
    }

}

export {User}