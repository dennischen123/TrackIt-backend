const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    if(!newUser.email || !newUser.password || !newUser.name) {
        return res.sendStatus(400);
    }

    db.User.findOne({ email: newUser.email }, (err, foundUser) => {
        if (err){
            return res.status(500).json(err);
        } else if (foundUser) {
            return res.status(400).json({ error: 'username exists' });
        }
        
        bcrypt.genSale(10, (err, salt) => {
            if (err)
                return res.status(500).json(err);
            bcrypt.hash(newUser.password, salt, (err, hashedPwd) => {
                if (err)
                    return res.status(500).json(err);
                newUser.password = hashedPwd;
                db.User.create(newUser, (err, savedUser) => {
                    if (err)
                        return res.status(500).json(err);
                    const token = jwt.sign({
                        name: savedUser.name,
                        _id: savedUser._id
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "30 days"  
                    },
                    );
                    return res.status(200).json({
                        message: 'User Created',
                        token
                    });
                });
            });
        });
    })
};

const login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    if(!user.email || !user.password)
        return res.sendStatus(400);
    db.User.findOne({email: user.email}, (err, foundUser) => {
        if (err)
            return res.status(500).sendStatus(400);
        if (!foundUser)
            return res.sendStatus(400);
        
        bcrypt.compare(user.password, foundUser.password, (err, match) => {
            if (match) {
                const token = jwt.sign(
                    {
                        name: foundUser.name,
                        _id: foundUser._id
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "30 days",
                    },
                );
                return res.status(200).json({
                    message: 'User Created',
                    token
                });
            } else {
                return res.sendStatus(400);
            };
        });
    });
};

module.exports = {
    register,
    login
}