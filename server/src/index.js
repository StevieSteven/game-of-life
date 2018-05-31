import express from 'express';
const app = express();

const PORT = 8080;

app.use('/', express.static(__dirname + '/../../client/build/'));

app.listen(PORT, () => {
    console.log("server started on port " + PORT );
});