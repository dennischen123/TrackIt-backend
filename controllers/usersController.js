const db = require('../models');
const fs = require('fs');

const upload = async (req, res) => {
    try {
        db.User.findOne({ _id: req.params.uid }, (err, foundUser) => {
            if (err)
                return res.status(500).json(err);
            let img = fs.readFileSync(req.file.path);
            let encode_image = img.toString('base64');
            let finalImg = {
                contentType: req.file.mimetype,
                path: req.file.path,
                uid: req.body.uid,
                data: new Buffer.from(encode_image, 'base64')
            };
            foundUser.warranties[foundUser.warranties.length-1].image = finalImg
            foundUser.save();
            res.json(foundUser);
        })
    } catch (err) {
        res.status(500).json(err);
    }
}


const index = async (req, res) => {
    try {
        const users = await db.User.find({});
        if (!users) 
            res.status(404).json({error: 'No Users found.'});
        res.json(users);
    } catch (err) {
        res.status(500).json('Error');
    }
}

const show = async (req, res) => {
    try {
        const user = await db.User.findById(req.params.id);
        if(!user)
            res.status(400).json({error: "No users found with that ID."});
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

const create = async (req, res) => {
    try {
        const newUser = await db.User.create(req.body);
        if (!newUser)
            res.status(400).json({error: 'User not created'});
        res.json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
}

const update = async (req, res) => {
    try {
        const updatedUser = await db.User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) 
            res.status(400).json({error: 'User not updated'});
        res.status(500).json(err);
    } catch (err) {
        res.status(500).json(err);
    }
}

const destroy = async (req, res) => {
    try {
        const deletedUser = await db.User.findByIdAndDelete(req.params.id);
        if (!deletedUser)
            res.status(400).json({error: 'User with that ID could not be found'});
        res.json(deletedUser);
    }   catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
    upload
}