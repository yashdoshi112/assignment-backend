// @ts-nocheck
import express, { Request, Response } from 'express';

const adminRouter = express.Router();

// In-memory storage (shared with cart)
let orders = [];
let discountCodes = [];

adminRouter.post('/generate-discount', (req: Request, res: Response) => {
  const orderCount = orders.length;
  if (orderCount % 5 === 0) {
    const discountCode = `DISCOUNT-${orderCount}`;
    discountCodes.push({ code: discountCode, orderId: `ORDER-${orderCount}`, valid: true });
    res.status(200).json({ message: 'Discount code generated', discountCode });
  } else {
    res.status(400).json({ message: 'Not eligible for a discount yet' });
  }
});

adminRouter.get('/stats', (req: Request, res: Response) => {
  const totalItems = orders.reduce((sum, order) => sum + order.items.length, 0);
  const totalAmount = orders.reduce((sum, order) => sum + order.total, 0);
  const totalDiscount = orders.reduce((sum, order) => sum + order.discountAmount, 0);

  res.status(200).json({
    totalItems,
    totalAmount,
    discountCodes,
    totalDiscount,
  });
});

export { adminRouter };

  