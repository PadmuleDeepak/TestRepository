const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

app.use(cors());


const tasks = {};


// To get all tasks
router.get('/tasks', (req, res) => {
    res.status(200).send(tasks);
    res.json(tasks);
    // const response = {
    //     statusCode: 200,
    //     body: JSON.stringify('Okkk'),
    //     }
    // return response;
})

// To create task
router.post('/tasks', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const {title, status} = req.body;
    tasks[id] = {id, title, status};
    // resp.status(201).send(tasks[id]);
    res.json(tasks[id]);
})

// To update task
router.patch('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const {title, status} = req.body;
    tasks[id] = {id, title, status}
    res.status(201).send(tasks[id]);
})

// To delete task
router.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    delete tasks[id]
    res.status(201).send(id);
})

app.use(bodyParser.json());
app.use('/.netlify/functions/api', router);
module.exports = app;
module.exports.handler = serverless(app);
