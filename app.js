require("dotenv/config");

require("./db");

const express = require("express");

const hbs = require("hbs");
hbs.registerPartials(`${__dirname}/views/partials/`)

const app = express();

require("./config")(app);
require("./config/session.config")(app);

app.locals.appTitle = 'SÉPTIMO ARTE ESTUDIOS';

require('./routes')(app)

require("./error-handling")(app);

module.exports = app;