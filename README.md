# Weather Widgets

A full-stack demo app to manage city widgets and view live weather data with caching.
Frontend: Next.js (TypeScript) · Backend: Express (TypeScript) · Database: MongoDB · Weather API: Open-Meteo

## 📦 Projektstruktur

/project-root
├── frontend/         → Next.js Frontend (Dashboard)
│   ├── src/app/      → Pages (e.g. page.tsx)
│   ├── src/utils/    → API helper
│   ├── src/types/    → Shared types
├── backend/          → Node.js Backend (Express + TS)
│   ├── src/routes/       → API routes
│   ├── src/controllers/  → Business logic
│   ├── src/models/       → Mongoose models
│   ├── src/schemes/      → Zod validation
│   ├── src/services/     → Weather + Cache
└── README.md

---

## 🚀 Setup-Anleitung

### Voraussetzungen:
- Node.js v18+
- MongoDB (lokal oder Atlas Cluster)
- NPM oder Yarn
- Git

### 1. Backend starten

```bash
cd backend

yarn install     # oder npm install

yarn dev         # startet http://localhost:5000
```

> 💡 Beispiel `.env`-Datei:
```env
MONGODB_URI=mongodb://localhost:27017/widgets
PORT=5000
CACHE_TTL_MS=300000
```

---

### 2. Frontend starten

```bash
cd frontend

yarn install     # oder npm install

yarn dev         # startet http://localhost:3000
```

> 💡 Beispiel `.env.local`(in frontend/.env.local):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```
---

## 🔍 Funktionale Anforderungen

### 🔹 Dashboard (Frontend)
- Widgets für verschiedene Städte anlegen (z. B. Berlin, Hamburg, Paris)
- Live-Wetterdaten anzeigen
- Widgets löschen
- Keine Authentifizierung notwendig

### 🔹 Backend (API + MongoDB)
- REST-API mit CRUD für Widgets
- MongoDB speichert:
  - Widget-Daten (`_id`, `location`, `createdAt`)
- Externer Wetterdienst (Open-Meteo) wird angebunden
- Ergebnisse werden 5 Minuten gecached (In-Memory)

---

## 🧾 API Endpunkte

| Methode | Endpoint                 | Beschreibung                       |
|---------|--------------------------|------------------------------------|
| GET     | `/widgets`               | Liste aller gespeicherten Widgets |
| POST    | `/widgets`               | Neues Widget erstellen (`location`) |
| DELETE  | `/widgets/:id`           | Widget löschen                     |

---

## ☁️ Wetterdaten-API

- Open-Meteo
    - Kein API-Key nötig
    - Endpunkte: Geocoding + Forecast (current_weather)

---

## 🧪 Ziel des Projekts

- Verständnis für API-Design, Next.js-Frontend und Microservice-Architektur
- Umgang mit externen APIs und Caching
- MongoDB-Datenmodellierung
- Trennung von Backend-Logik und Frontend-Komponenten
- saubere Code-Struktur, Modularität und Dokumentation

---

## 📄 Architekturüberblick

```mermaid
flowchart TD
    A[Frontend<br>Next.js (TS)<br>Dashboard UI] -->|REST API Calls| B[Backend<br>Express (TS)<br>Controllers, Services, Models]
    B --> C[MongoDB<br>Widgets (CRUD)<br>_id, location, createdAt]
    B --> D[Weather API<br>Open-Meteo<br>(Geocoding + Current Weather)]
    D --> E[(In-Memory Cache<br>5 min TTL)]
```