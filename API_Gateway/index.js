const express = require('express');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs : 2*60*1000 , 
    max : 5
})

app.use(limiter);

const app = express();

const PORT = 3010;

app.use(morgan('combined'));
app.use('/bookingservice' , createProxyMiddleware({target : 'http://localhost:6000/' , changeOrigin : true}));
app.get('/home' , (req , res) => {
    return res.json({message : 'OK'})
});


app.listen(PORT , ()=>{
    console.log(`The server is running on PORT ${PORT}`);
});