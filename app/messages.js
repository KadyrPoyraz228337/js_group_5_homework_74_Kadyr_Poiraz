const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {
    const messages = [];
    fs.readdir('./messages', (err, files) => {
        if(err) throw err;
        files.reverse().forEach(file => messages.length < 5 && messages.push(JSON.parse(fs.readFileSync(`./messages/${file}`, 'UTF-8'))));
        res.send(messages);
    });
});

router.post('/', (req, res) => {
    const data = {...req.body, datetime: new Date().toISOString()};
    fs.writeFile(`./messages/${new Date().toISOString()}.txt`, JSON.stringify(data), err => { if(err) throw err });
    res.send(data)
});

module.exports = router;