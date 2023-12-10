import user from './user';
import express from 'express';

const app = express();

user(app);

export default app;