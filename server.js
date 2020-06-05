const express = require('express');
const app = express();

const path = require("path");

const router = express.Router();
app.use(express.static('public'));

router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, "public/index.html"));

})


app.use('/', router); //use this when you define const router

const port = 8083;
app.listen(port, ()=>{
    console.log(`Your app is running on ${port}`);
})