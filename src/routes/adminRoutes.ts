// @ts-nocheck
import { Router } from 'express';
import { generateDiscount, getStatistics } from '../controllers/adminController';

const router = Router();

router.get('/generate-discount', generateDiscount);
router.get('/statistics', getStatistics);

export default router;
