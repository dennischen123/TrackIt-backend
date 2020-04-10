const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

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

//CORS - Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api', routes.auth);
app.use('/api', routes.api);

app.get('/', (req, res) => {
    res.send('api page');
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));