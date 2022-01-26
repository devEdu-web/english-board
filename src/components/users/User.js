import {db} from '../../config/database.js'

class User {
    constructor(name, email, password) {
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

}

export {User}