// src/app.ts
import express, { Express } from 'express';
import router from './routes';

const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router);

export default app;
