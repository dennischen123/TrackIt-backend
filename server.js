const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
// const multer = require('multer');
// const upload = multer({ dest: __dirname + '/../public/uploads' });

require('dotenv').config();

//Port
const PORT = process.env.PORT || 4000;

//Routes
const routes = require('./routes');

//Database
const db = require('./models');

const corsOptions = {
    origin: ['http://localhost:3000'],
    methods: "GET, POST, PUT, DELETE",
    Credentials: true,
    optionsSuccessStatus: 200
}

//MiddleWare
app.use(express.static('./public'));
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api', routes.auth);
app.use('/api', routes.api);

app.get('/', (req, res) => {
    res.send('api page');
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));