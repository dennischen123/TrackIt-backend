const db = require('../models');

const index = async(req, res) => {
    db.User.findById(req.params.uid, (err, foundUser) => {
        if (err)
            return res.status(500).json(err);
        res.json(foundUser.warranties)
    })
}

const show = async(req, res) => {
    db.User.findById(req.params.uid, (err, foundUser) => {
        if (err)
            return res.status(500).json(err);
        res.json(foundUser.warranties.filter((warranty) => warranty._id == req.params.wid))
    })
}


const create = async(req, res) => {
    newWarranty = {
        name: req.body.name,
        brand: req.body.brand,
        model: req.body.model,
        purchaseDate: req.body.purchaseDate,
        warrantyLength: req.body.warrantyLength,
        warrantyPrice: req.body.WarrantyPrice,
        serialNumber: req.body.serialNumber,
        comments: req.body.comments,
    }
    db.User.findOne({ _id: req.params.uid }, (err, foundUser) => {
        if (err)
            return res.status(500).json(err);
        foundUser.warranties.push(newWarranty);
        foundUser.save();
        res.json(foundUser);
    })
}

const update = async(req, res) => {
    db.User.findById(req.params.uid, (err, foundUser) => {
        if (err)
            return res.status(500).json(err)
        foundUser.warranties.forEach((warranty, index) => {
            if (warranty._id == req.params.wid) {
                let image = foundUser.warranties[index].image;
                foundUser.warranties[index] = {...foundUser.warranties[index], ...req.body }
                foundUser.warranties[index].image = image;
                foundUser.save((err, updatedWarranty) => {
                    if (err)
                        return res.status(500).json(err);
                    res.json(updatedWarranty);
                })
            }
        })
    })
}

const destroy = async(req, res) => {
    db.User.findById(req.params.uid, (err, foundUser) => {
        if (err)
            return res.status(500).json(err);
        foundUser.warranties = foundUser.warranties.filter(warranty => warranty._id != req.params.wid);
        foundUser.save();
        res.json(foundUser.warranties)
    })
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy
}