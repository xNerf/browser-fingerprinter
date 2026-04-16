const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use((req, res) => {
    res.status(404).send('no file found');
});

app.listen(80, () => {
    console.log(`serwer turned on!`);
});