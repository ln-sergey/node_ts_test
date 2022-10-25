import Koa from 'koa';
import { usersRouter } from './middlewares/usersRouter';
import { DataBase } from './models';
import { MongoClient } from 'mongodb';
import { errorHandler } from './middlewares/error_handler';

const PORT: number = +(process.env.PORT ?? 8080);

const app = new Koa();


DataBase.connect()
.then((mongoClient: MongoClient) => {
        app.context.db = mongoClient.db(process.env.DB_NAME);

        app.use(errorHandler);
        app.use(usersRouter.routes());
        app.use(usersRouter.allowedMethods());

        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch((err: Error) => {
        console.error(err);
        app.context.db.close();
        process.exit(1);
    });
