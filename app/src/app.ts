import Koa, { Context } from 'koa';
import { onRequestListener } from './middlewares/on_request_listener';
import { DataBase } from './models';
import { MongoClient } from 'mongodb';
import { ClientError, NotFoundError } from './errors';
import { errorHandler } from './middlewares/error_handler';
import { bodyParser } from './middlewares/body_parser';

const PORT: number = +(process.env.PORT ?? 8080);

const app = new Koa();

app.use(errorHandler);
app.use(bodyParser);
app.use(onRequestListener);



DataBase.connect()
    .then((mongoClient: MongoClient) => {
        mongoClient.db
        app.context.db = mongoClient.db(process.env.DB_NAME);
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    })
    .catch((err: Error) => {
        console.log(err);
        app.context.db.close();
        process.exit(1);
    });
