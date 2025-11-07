// models/User.js

const mongoose = require('mongoose');

// Ye hum user ka 'schema' (dhancha) bana rahe hain
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // Ye field zaroori hai
        unique: true      // Har user ka username alag hona chahiye
    },
    email: {
        type: String,
        required: true,
        unique: true      // Har user ka email alag hona chahiye
    },
    password: {
        type: String,
        required: true
    }
});

// Hum is schema ko ek 'model' mein badal rahe hain
// Is model ka naam 'User' hai
const User = mongoose.model('User', userSchema);

// Is model ko export kar rahe hain taaki server.js iska istemaal kar sake
module.exports = User; 