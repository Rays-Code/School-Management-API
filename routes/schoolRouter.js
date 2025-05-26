import express from 'express';
import { addSchool } from '../controllers/addSchoolController.js';
import { listSchool } from '../controllers/listSchoolsController.js';

const schoolRouter = express.Router();


schoolRouter.post('/addSchool', addSchool);
schoolRouter.get('/listSchools', listSchool);



export default schoolRouter;