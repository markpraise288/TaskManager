require('dotenv').config();
const { PORT } = require('./config/env');
const app = require('./app');
const connectDB = require('./infrastructure/database/db');

connectDB();

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`);
})

