import bcrypt from 'bcryptjs';
import mongoose from '../config/database';

const userSchema = new mongoose.Schema({
    'name': {
        type: String,
        required: true
    },
    'email': {
        type: String,
        required: true,
        unique: true
    },
    'password': {
        type: String,
        select: false,
        required: true
    },
    'phones': [
        {
            'number': Number,
            'prefix': Number
        }
    ],
    'creationDate':
    {
        type: Date,
        default: Date.now()
    },
    'updateDate': Date,
    'lastLoginDate': {
        type: Date,
        default: Date.now()
    }
});

userSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});


module.exports = mongoose.model('User', userSchema);
