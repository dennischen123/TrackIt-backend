const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

require('dotenv').config();

//Port
const PORT = process.env.PORT;

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
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
    session({
        store: new MongoStore({ url: process.env.MONGODB_URI }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 * 2 //=> 2 weeks
        }
    })
)

app.use('/api', routes.auth);
app.use('/api', routes.api);

app.get('/', (req, res) => {
    res.send('api page');
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));