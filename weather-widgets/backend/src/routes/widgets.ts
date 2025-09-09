import { Router } from 'express';

const r = Router();

r.get('/', (_req, res) => {
  res.json([{ id: 1, location: 'Berlin (stub)' }]);
});

export default r;
