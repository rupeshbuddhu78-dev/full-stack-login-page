// 1. ज़रूरी लाइब्रेरी को इम्पोर्ट करना
const express = require('express');
const mongoose = require('mongoose');

// User model ko import karna
const User = require('./User.js');

// 2. एक्सप्रेस ऐप बनाना
const app = express();
// HOSTING KE LIYE PORT BADLAAV
const port = process.env.PORT || 3000; // Yeh hosting ke liye zaroori hai

// 3. मिडलवेयर (Middleware) सेट करना
app.use(express.json()); // JSON डेटा ke liye
app.use(express.urlencoded({ extended: true })); // HTML फॉर्म डेटा ke liye
app.use(express.static('.')); // 'index.html' aur 'login.html' files ke liye

// 4. MongoDB से कनेक्ट करना (SAFE TAREEKA)
// Humne password hata diya hai aur 'process.env.MONGO_URI' ka istemaal kar rahe hain
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB ATLAS से सफलतापूर्वक कनेक्ट हो गया!');
    })
    .catch((err) => {
        console.error('MongoDB Atlas से कनेक्ट नहीं हो सका:', err);
    });

// 5. API Routes (Endpoints)

// ### Register Route ###
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({
            username: username,
            email: email,
            password: password 
        });
        await newUser.save();
        console.log('User registered:', newUser);
        res.redirect('/login.html'); 
    } catch (error) {
        console.error('Registration error:', error);
        if (error.code === 11000) {
            return res.status(400).send('Email ya Username pehle se hi register hai.');
        }
        res.status(500).send('Registration mein error aa gaya.');
    }
});

// ### Login Route ###
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(400).send('Invalid username ya password.');
        }
        if (user.password !== password) {
            return res.status(400).send('Invalid username ya password.');
        }

        console.log('User logged in:', user);
        res.redirect('/home.html'); 
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Login mein error aa gaya.');
    }
});

// 6. सर्वर को 'सुनना' (Start) करना
app.listen(port, () => {
    // Port number ab dynamic ho gaya hai
    console.log(सर्वर port ${port} पर chal raha hai);
});

