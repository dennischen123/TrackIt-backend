const AWS = require('aws-sdk');

const s3Client = new AWS.S3({
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
    Bucket: process.env.BUCKET_NAME
})

const uploadParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: '',
    Body: null,
};
const doUpload = (req, res) => {
    uploadParams.Key = req.file.originalname;
    uploadParams.Body = req.file.buffer;

    //data.location => image url
    s3Client.upload(uploadParams, (err, data) => {
        if (err) res.status(500).json({ error: `Error - ${err}` });
        res.json({ message: `File uploaded succesfully! - keyname = ${uploadParams.Key}`, data })
    })
}

module.exports = {
    doUpload,
}