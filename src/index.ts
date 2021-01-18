/* eslint-disable import/first */
import { config } from 'dotenv';

config();

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import './bot';
import getWeather from './utils/getMarsWeather';

(async () => {
    const app = express();
    const port = process.env.PORT || 5000;

    app.use(helmet());
    app.use(morgan('dev'));

    const data = await getWeather();
    console.log(data);

    app.get('/', (_, res) => res.json({ msg: 'Hello World!' }));

    app.listen(port, () => console.log(`Server is running on port ${port}...`));
})();
