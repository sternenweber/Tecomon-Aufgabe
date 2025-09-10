import { Router } from 'express';
import { createWidget, deleteWidget, listWidgets, getWeatherForLocation } from '../controllers/widgets.controller';

const r = Router();

r.get('/', listWidgets);
r.post('/', createWidget);
r.delete('/:id', deleteWidget);

r.get('/weather', getWeatherForLocation);

export default r;
