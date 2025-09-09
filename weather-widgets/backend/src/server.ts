import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import pino from 'pino';
import widgetsRouter from './routes/widgets';

const logger = pino({ transport: { target: 'pino-pretty' } });

export function createServer() {
  const app = express();

  app.use(cors({ origin: ['http://localhost:3000'], credentials: false }));
  app.use(express.json());

  const uri = process.env.MONGODB_URI!;
  mongoose
    .connect(uri)
    .then(() => logger.info('[db] connected'))
    .catch((e) => logger.error(e));

  app.get('/health', (_, res) => res.json({ ok: true }));
  app.use('/widgets', widgetsRouter);

  // 404 & error handlers
  app.use((_, res) => res.status(404).json({ error: 'Not found' }));
  app.use((err: any, _req: any, res: any, _next: any) => {
    logger.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Server error' });
  });

  return app;
}
