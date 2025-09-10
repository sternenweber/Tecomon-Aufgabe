'use client';

import { useEffect, useState } from 'react';
import type { Widget } from '@/types/widget';
import { api } from '@/utils/api';

export default function Home() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [location, setLocation] = useState('Berlin');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadWidgets() {
    const data = await api<Widget[]>('/widgets');
    setWidgets(data);
  }

  async function addWidget() {
    if (!location.trim()) return;
    await api<Widget>('/widgets', {
      method: 'POST',
      body: JSON.stringify({ location }),
    });
    setLocation('');
    loadWidgets();
  }

  async function removeWidget(id: string) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/widgets/${id}`, {
      method: 'DELETE',
    });
    loadWidgets();
  }

  async function fetchWeather(city: string) {
    setLoading(true);
    setWeather(null);
    setError(null);
    try {
      const w = await api<any>(
        `/widgets/weather?location=${encodeURIComponent(city)}`
      );
      setWeather(w);
    } catch (e: any) {
      try {
        const parsed = JSON.parse(e.message);
        setError(parsed.error || 'Failed to fetch weather');
      } catch {
        setError(e.message || 'Failed to fetch weather');
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWidgets();
  }, []);

  return (
    <main style={{ maxWidth: 800, margin: '2rem auto', padding: '1rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Weather Widgets</h1>

      <section style={{ display: 'flex', gap: 8, margin: '1rem 0' }}>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City (e.g., Berlin)"
          style={{
            flex: 1,
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '6px',
          }}
        />
        <button
          onClick={addWidget}
          style={{
            padding: '0.5rem 1rem',
            background: '#2563eb',
            color: 'white',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Add
        </button>
      </section>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {widgets.map((w) => (
          <li
            key={w._id}
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <button
              onClick={() => fetchWeather(w.location)}
              style={{
                padding: '0.25rem 0.5rem',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Show weather
            </button>
            <span style={{ flex: 1 }}>{w.location}</span>
            <button
              onClick={() => removeWidget(w._id)}
              style={{
                padding: '0.25rem 0.5rem',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {loading && <p>Loading weather…</p>}

      {error && (
        <p style={{ color: 'red', marginTop: '1rem' }}>
          ⚠️ {error}. Please check the spelling of the city.
        </p>
      )}

      {weather && (
        <div
          style={{
            background: '#f3f4f6',
            padding: '1rem',
            borderRadius: '12px',
            marginTop: '1rem',
          }}
        >
          <h2 style={{ marginBottom: '0.5rem' }}>
            {weather.city}, {weather.country}
          </h2>
          <p>
            <strong>Temperature:</strong> {weather.current.temperature} °C
          </p>
          <p>
            <strong>Wind:</strong> {weather.current.windspeed} km/h
          </p>
          <p>
            <strong>Direction:</strong> {weather.current.winddirection}°
          </p>
          <p>
            <strong>Time:</strong> {weather.current.time}
          </p>
          <p
            style={{
              color: weather.source === 'cache' ? 'orange' : 'green',
              fontWeight: 'bold',
            }}
          >
            Source: {weather.source}
          </p>
        </div>
      )}
    </main>
  );
}
