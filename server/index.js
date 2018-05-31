import express from 'express';


const app = express();

app.use('/', express.static(__dirname + '/../client/build/'));

app.listen(8080, () => {
    console.log("server started")
});