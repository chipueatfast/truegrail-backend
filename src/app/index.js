import Express from 'express';
import bodyParser from 'body-parser';
import { initSequelize } from '~/sequelize/models/index';
import { UserRoute, FactoryRoute, ContractRoute, SneakerRoute } from './route/index';
import { CORSPolicyGuard } from '~/middleware/index';


const app = Express();
const port = process.env.PORT;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(CORSPolicyGuard);

app.use('/user', UserRoute);
app.use('/factory', FactoryRoute);
app.use('/contract', ContractRoute);
app.use('/sneaker', SneakerRoute);


initSequelize();
app.listen(port, () =>  console.log(`Server running at port ${port}`));


