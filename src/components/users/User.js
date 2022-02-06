import {db} from '../../config/database.js'
import {ObjectId} from 'mongodb'

class User {
    constructor(name, email, password) {
        this._id = ObjectId()
        this.name = name,
        this.email = email,
        this.password = password
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

}

export {User}