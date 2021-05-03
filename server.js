const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'movieratingapplicationsecretkey';

const app = express();
const router = express.Router();

const serveStatic = require('serve-static')

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

// connect to mongodb
mongoose.connect('mongodb+srv://admin:root@socialmediaapp.srbbh.mongodb.net/soicalApp?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true})
  .catch(err => {
    console.error('App starting error:');
  });


// include controllers
fs.readdirSync("controllers").forEach(function (file) {
  if (file.substr(-3) == ".js") {
    const route = require("./controllers/" + file)
    route.controller(app)
  }
})

app.use(serveStatic(__dirname + "/dist"))

router.get('/', function (req, res) {
  res.json({
    message: 'API Initialized!'
  });
});

const port = 8081;
app.use('/', router);
app.listen(port, function () {
  console.log(`api running on port ${port}`);
});

// process.env.API_PORT ||
