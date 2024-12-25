//@ts-nocheck
import express, { Request, Response } from 'express';

const cartRouter = express.Router();

// In-memory storage
let cart = [];
let orders = [];
let discountCodes = [];
let orderCount = 0;

cartRouter.post('/add', (req: Request, res: Response) => {
  const { id, name, price } = req.body.items;
  cart.push({ id, name, price });
  res.status(201).json({ message: 'Item added to cart' });
});

cartRouter.post('/checkout', (req: Request, res: Response) => {
  if (cart.length === 0) return res.status(400).json({ message: 'Cart is empty' });

  orderCount++;

  // Calculate total
  let total = cart.reduce((sum, item) => sum + item.price, 0);
  let discount = 0;

  // Apply discount for nth order
  if (orderCount % 5 === 0) {
    const discountCode = `DISCOUNT-${orderCount}`;
    discount = total * 0.10;
    discountCodes.push({ code: discountCode, orderId: `ORDER-${orderCount}`, valid: true });
  }

  const order = {
    id: `ORDER-${orderCount}`,
    items: cart,
    total: total - discount,
    discountApplied: discount > 0,
    discountAmount: discount,
  };

  orders.push(order);
  cart = []; // Clear cart after checkout

  res.status(200).json({
    message: 'Order placed successfully',
    order,
  });
});

export { cartRouter };
