import { Router } from 'express';
import { userControllers } from './user.controller';

const router = Router();

router.post('/signup', userControllers.signUp);


export default router;