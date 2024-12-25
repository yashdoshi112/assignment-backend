// @ts-nocheck
import cors from 'cors';

const express = require('express');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Hello from the backend!'));

app.listen(5000, () => console.log('Server running on http://localhost:5000'));