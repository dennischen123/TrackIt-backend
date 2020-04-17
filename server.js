const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: __dirname + '/../public/uploads' });
// const path = require('path');

require('dotenv').config();

//Port
const PORT = process.env.PORT || 4000;

//Routes
const routes = require('./routes');

//Database
const db = require('./models');

// Create Storage engine
// const storage = multer.diskStorage({
//     destination: './public/uploads/',
//     filename: ((req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + Path2D.extname(file.originalname));
//     })
// })

// Init Upload
// const upload = multer({
//     storage: storage
// }).single('myImage');

const corsOptions = {
    origin: ['http://localhost:3000'],
    methods: "GET, POST, PUT, DELETE",
    Credentials: true,
    optionsSuccessStatus: 200
}

//MiddleWare

app.use(express.static('./public'));
//CORS - Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// router.post('/upload', upload.single('photo'), (req, res) => {
//     console.log("upload route")
// });
app.use('/api', routes.auth);
app.use('/api', routes.api);

app.get('/', (req, res) => {
    res.send('api page');
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));