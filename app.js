import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import { getAll } from './services/EmployeeService.js';

dotenv.config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(
  bodyParser.json({
    limit: '50mb',
  })
);
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
    return res.status(200).json({});
  }
  next();
});

app.get('/', async (req, res) => {
  try {
    res.status(200).json({
      error: false,
      message: 'Hello World!',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

app.get('/v1/api/employees', async (req, res) => {
  try {
    const result = await getAll(req);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

export default app;
