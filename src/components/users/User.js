// import {db} from '../../config/database.js'
import {ObjectId} from 'mongodb'
import {getDb} from '../../config/database.js'

class User {
    constructor(name, email, password, profilePicture = {url: undefined}) {
        this._id = ObjectId()
        this.name = name,
        this.email = email,
        this.password = password
        this.profilePicture = profilePicture
    }

    save() {
        const db = getDb()
        return db.collection('users').insertOne(this)
    }

    static findUserByEmail(email) {
        const db = getDb()
        return db.collection('users').findOne({email})
    }

    static findUserById(userId) {
        const db = getDb()
        return db.collection('users').findOne({
            _id: new ObjectId(userId)
        })
    }

    static updateName(userId, updatedName) {
        const db = getDb()
        return db.collection('users').updateOne(
            {_id: new ObjectId(userId)},
            {$set: {name: updatedName}}   
        )
    }

    static updateEmail(userId, updatedEmail) {
        const db = getDb()
        return db.collection('users').updateOne(
            {_id: new ObjectId(userId)},
            {$set: {email: updatedEmail} }
        )
    }

    static updatePassword(userId, updatedPassword) {
        const db = getDb()
        return db.collection('users').updateOne(
            {_id: new ObjectId(userId)},
            {$set: {password: updatedPassword}}
        )
    }

    static updateProfilePicture(userId, url) {
        const db = getDb()
        return db.collection('users').updateOne(
            {_id: new ObjectId(userId)},
            {$set: {"profilePicture.url": url}}
        )
    }

}

export {User}