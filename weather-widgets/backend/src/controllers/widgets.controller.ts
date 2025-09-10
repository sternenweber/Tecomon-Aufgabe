import { Request, Response } from 'express';
import { Widget } from '../models/Widget';
import { getCurrentWeather } from '../services/weather.service';
import { createWidgetBody } from '../schemes/widget.scheme';

export async function listWidgets(_req: Request, res: Response) {
  const docs = await Widget.find().sort({ createdAt: -1 }).lean();
  res.json(docs);
}

export async function createWidget(req: Request, res: Response) {
  const parsed = createWidgetBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const doc = await Widget.create({ location: parsed.data.location });
  res.status(201).json(doc);
}

export async function deleteWidget(req: Request, res: Response) {
  await Widget.findByIdAndDelete(req.params.id);
  res.status(204).send();
}

export async function getWeatherForLocation(req: Request, res: Response) {
  const { location } = req.query as { location?: string };
  if (!location) return res.status(400).json({ error: 'location required' });

  try {
    const weather = await getCurrentWeather(location);
    res.json(weather);
  } catch (e: any) {
    res.status(404).json({ error: e.message || 'Not found' });
  }
}
