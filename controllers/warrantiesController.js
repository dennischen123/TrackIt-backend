const db = require('../models');

const index = async (req, res) => {
    console.log("index controller");
}

const show = async (req, res) => {
    console.log("show controller");
}

const create = async (req, res) => {
    console.log("create controller");
}

const update = async (req, res) => {
    console.log("update controller");
}

const destroy = async (req, res) => {
    console.log("delete controller");
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy
}