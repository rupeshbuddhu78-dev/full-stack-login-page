// 1. ज़रूरी लाइब्रेरी को इम्पोर्ट करना
const express = require('express');
const mongoose = require('mongoose');



// User model ko import karna
const User = require('./models/User.js');

// 2. एक्सप्रेस ऐप बनाना
const app = express();
const port = 3000; // हम अपने सर्वर को पोर्ट 3000 पर चलाएंगे

// 3. मिडलवेयर (Middleware) सेट करना
app.use(express.json()); // JSON डेटा के लिए
app.use(express.urlencoded({ extended: true })); // HTML फॉर्म डेटा के लिए
app.use(express.static('.')); // 'index.html' aur 'login.html' files ke liye

// 4. MongoDB से कनेक्ट करना
mongoose.connect('mongodb://localhost:27017/userDatabase')
    .then(() => {
        console.log('MongoDB से सफलतापूर्वक कनेक्ट हो गया!');
    })
    .catch((err) => {
        console.error('MongoDB से कनेक्ट नहीं हो सका:', err);
    });

// 5. API Routes (Endpoints)

// ### Register Route ###
app.post('/register', async (req, res) => {
    try {
        // Form se data nikaalna
        const { username, email, password } = req.body;

        // Note: Asli project mein password ko hash karna chahiye
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username: username,
            email: email,
            password: password // Yahaan hashedPassword ka istemaal karein
        });

        // Naye user ko database mein save karna
        await newUser.save();

        console.log('User registered:', newUser);
        // Register hone ke baad login page par bhej dein
        res.redirect('/login.html'); 

    } catch (error) {
        console.error('Registration error:', error);
        // Agar user pehle se hai (unique error)
        if (error.code === 11000) {
            return res.status(400).send('Email ya Username pehle se hi register hai.');
        }
        res.status(500).send('Registration mein error aa gaya.');
    }
});

// ### Login Route ###
app.post('/login', async (req, res) => {
    try {
        // Form se data nikaalna
        const { username, password } = req.body;

        // 1. User ko database mein dhoondhna (username ke basis par)
        const user = await User.findOne({ username: username });

        // 2. Agar user nahi mila
        if (!user) {
            return res.status(400).send('Invalid username ya password.');
        }

        // 3. Password check karna
        // (Agar aapne hash kiya hai, toh bcrypt.compare ka istemaal karein)
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) { ... }

        // Abhi ke liye simple password check (bina hashing ke)
        if (user.password !== password) {
            return res.status(400).send('Invalid username ya password.');
        }

        // 4. Agar sab theek hai, toh use main page par bhej dein
        console.log('User logged in:', user);
        res.redirect('/home.html'); // Login ke baad home page par redirect  

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Login mein error aa gaya.');
    }
});

// 6. सर्वर को 'सुनना' (Start) करना
app.listen(port, () => {
    console.log(`सर्वर http://localhost:${port} पर chal raha hai`);
});