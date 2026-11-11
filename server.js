
const express = require('express');
const mongoose = require('mongoose');


const User = require('./User.js');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('.'));


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB ATLAS से सफलतापूर्वक कनेक्ट हो गया!');
    })
    .catch((err) => {
        console.error('MongoDB Atlas से कनेक्ट नहीं हो सका:', err);
    });


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

ा
app.listen(port, () => {
   
    console.log(`सर्वर port ${port} पर chal raha hai`);
});


