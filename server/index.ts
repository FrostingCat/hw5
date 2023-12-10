import express from "express";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import tableRouter from './controllers/tableController/tableController'
import chairRouter from './controllers/chairController/chairController'
import closetRouter from './controllers/closetController/closetController'
import routes from './routes';

const cors = require('cors');
const app = express();

const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use(bodyParser.json())

app.use('/tables', tableRouter);
app.use('/chairs', chairRouter);
app.use('/closets', closetRouter);
app.use('/user', routes);

app.listen(port, async () => {
	await mongoose.connect('mongodb+srv://frostingcat:03lLhNgolTxUoY6G@cluster0.i4anyeo.mongodb.net/furniture?retryWrites=true&w=majority')
	console.log('Server running on port ' + port);
});
