const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
const cors = require("cors");
const PORT = 8080;

app.use(cors());
app.use(express.json());


const postsRoute = require('./Router/postsRoute');
app.use('/posts', postsRoute);

app.listen(PORT, () => {
    console.log("server started on port " + PORT);
});