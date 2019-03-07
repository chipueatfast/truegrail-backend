import Express from 'express';
import { sequelize } from '~/sequelize/models';
import { UserRoute } from '~/route';
import bodyParser from 'body-parser';

const app = Express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// route
app.use('/user', UserRoute);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully');
    })
    .catch(err => {
        console.log('Unable to connect to database: ', err);
    });

app.listen(port, () =>  console.log(`Server running at port ${port}`));


