const pdf = require('html-pdf');
const pdfTemplate = require('../documents');

const createPdf = (req, res) => {
    console.log("create-pdf")
    pdf.create(pdfTemplate(req.body), {}).toFile(`${__dirname}/new.pdf`,
        (err) => {
            if (err) {
                return console.log(err);
            }
            res.send(Promise.resolve())
        })
}

const fetchPdf = (req, res) => {
    console.log("fetch-pdf");
    res.sendFile(`${__dirname}/new.pdf`);
}

module.exports = {
    createPdf,
    fetchPdf
}