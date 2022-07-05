import express from 'express';
import compression from 'compression';
import path from 'path';
import next from 'next';
import graphqlServer from '../graphql/server';

const app = express();

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().catch((err) => console.log(err));

app.use(compression());

app.use('/graphql', graphqlServer);
app.use('/public', express.static(path.join(__dirname, '../../public')));

app.all('*', (req, res) => handle(req, res));

export default app;
