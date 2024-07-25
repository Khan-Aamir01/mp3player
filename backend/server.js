require('dotenv').config();
const express = require('express');
const connectDb = require('./config/connectDb');
const songRoutes = require('./routes/songRoute');

const app = express();
app.use(express.json());
connectDb();
app.use('/api/song',songRoutes);

app.get('/',(req,res)=>{
    res.send('Home Router');
});

app.listen(process.env.PORT || 3000,(req,res)=>{
    console.log('Server Started');
});