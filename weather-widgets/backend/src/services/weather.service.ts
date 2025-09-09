import axios from 'axios';
import { TTLCache } from './cache';

const cache = new TTLCache<any>();

async function geocodeCity(city: string) {
  const url = 'https://geocoding-api.open-meteo.com/v1/search';
  const { data } = await axios.get(url, {
    params: { name: city, count: 1, language: 'en', format: 'json' }
  });
  if (!data?.results?.length) throw new Error('City not found');
  const { latitude, longitude, name, country, timezone } = data.results[0];
  return { latitude, longitude, name, country, timezone };
}

export async function getCurrentWeather(city: string) {
  const key = city.toLowerCase();
  const cached = cache.get(key);
  if (cached) return { source: 'cache', ...cached };

  const g = await geocodeCity(city);
  const wUrl = 'https://api.open-meteo.com/v1/forecast';
  const { data } = await axios.get(wUrl, {
    params: { latitude: g.latitude, longitude: g.longitude, current_weather: true }
  });
  const shaped = {
    city: g.name,
    country: g.country,
    latitude: g.latitude,
    longitude: g.longitude,
    timezone: g.timezone,
    current: data.current_weather
  };
  cache.set(key, shaped);
  return { source: 'live', ...shaped };
}
