const express = require('express');
const cors = require('cors');
const PORT = 8080;
const app = express();
const Userrouter = require('./routes/User/index.js');
const Adminrouter = require('./routes/admin/index.js');


app.use(Userrouter);
// app.use(Adminrouter);

app.use(cors({
    origin: '*'
}));


app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

