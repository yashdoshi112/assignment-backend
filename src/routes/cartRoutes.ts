// @ts-nocheck
import { Router } from 'express';
import { addToCart, checkout } from '../controllers/cartController';

const router = Router();

router.post('/add-to-cart', addToCart);
router.post('/checkout', checkout);

export default router;
