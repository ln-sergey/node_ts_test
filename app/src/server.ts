import http from 'http';
import dotenv from 'dotenv';
import { onRequestListener } from './handler';
import { dataBase } from './models';

dotenv.config();

const PORT: number = +(process.env.NODE_DOCKER_PORT ?? 8080);

const server: http.Server = new http.Server();

dataBase.mongoose
  .connect(dataBase.url)
  .then(() => {
    console.log("Connected to the database!");
    server.on('request', onRequestListener);
    server.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


