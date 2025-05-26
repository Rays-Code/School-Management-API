import express from 'express';
import dotenv from 'dotenv';
import schoolRouter from './routes/schoolRouter.js';

dotenv.config(); 
const app = express();
app.use(express.json())

app.use('/api', schoolRouter) // redirecting all requests coming to api to schoolRouter.


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))