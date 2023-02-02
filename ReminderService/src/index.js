const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const EmailService = require('./services/email-service');
// const job = require('./utils/job')
const { createChannel , subscribeMessage } = require('./utils/messageQueue');

const { create } = require('./controllers/ticket-controller');
const { REMINDER_BINDING_KEY } = require('./config/serverConfig')

const startServer = async()=>{
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));

    app.post('/api/v1/tickets' , create);

    const channel = await createChannel();
    subscribeMessage(channel , EmailService.createNotification , REMINDER_BINDING_KEY);

    app.listen(PORT , ()=>{
        console.log(`The server is running on PORT ${PORT}`);
        // job();
        
    });
}

startServer();