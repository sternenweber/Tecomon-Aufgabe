import dotenv from 'dotenv';
dotenv.config();
import { createServer } from './server';

const port = Number(process.env.PORT || 5000);
const app = createServer();
app.listen(port, () => console.log(`[api] up on http://localhost:${port}`));
