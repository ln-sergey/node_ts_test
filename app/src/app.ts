import Koa from 'koa';
import { router } from './middlewares/router';
import { DataBase } from './models';
import { MongoClient } from 'mongodb';
import { errorHandler } from './middlewares/error_handler';
import { bodyParser } from './middlewares/body_parser';

const PORT: number = +(process.env.PORT ?? 8080);

const app = new Koa();

app.use(errorHandler);
app.use(bodyParser);
app.use(router);

DataBase.connect()
    .then((mongoClient: MongoClient) => {
        app.context.db = mongoClient.db(process.env.DB_NAME);
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch((err: Error) => {
        console.error(err);
        app.context.db.close();
        process.exit(1);
    });
