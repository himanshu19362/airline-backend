const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig')
const apiRoutes = require('./routes/index');
const db = require('./models/index');

const startServer = async ()=>{
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.use('/api' , apiRoutes);

    app.get('/bookingservice/api/v1/home' , (req , res) => {
        return res.json({message : 'Hitting the Booking Service'})
    })

    app.listen(PORT , async ()=>{
        console.log(`The server is running on port ${PORT}`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter : true});
        }
    });
}

startServer();