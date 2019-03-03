import sequelize from './model';
import { HelloWorld } from '../sequelize';
const express = require('express');
const app = express();
const port = 2190;

app.get('/', (req, res) => {
    res.send('Hello world again');
});

HelloWorld();

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully');
}).catch(err => {
    console.log('Unable to connect to database: ', err);
});

app.listen(port, () => console.log(`Server running at port ${port}`));