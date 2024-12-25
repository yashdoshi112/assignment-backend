import express from 'express';
import { cartRouter } from './controllers/cartController';
import { adminRouter } from './controllers/adminController';
import cors from 'cors';

const app = express();
app.use(cors());
const port = 3001;

app.use(express.json());

// Routes
app.use('/cart', cartRouter);
app.use('/admin', adminRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
