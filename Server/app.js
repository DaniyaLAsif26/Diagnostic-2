import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();

app.get('/api/health' , (_ , res) =>{
    res.status(200).json({
        success : true,
        status : 'ok'
    })
})

app.listen(process.env.PORT , ()=> {
    console.log(`App listening on port ${process.env.PORT}`)
})