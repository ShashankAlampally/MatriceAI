const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db.js');
const routes = require('./routes/routes.js');
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/',routes);
const port = 7001;
app.listen(port, () => {
    console.log("Server running on port number " + port);
});
