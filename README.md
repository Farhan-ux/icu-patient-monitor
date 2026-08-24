# ICU Patient Monitor Dashboard

Real-time intensive care unit patient monitoring interface built with Next.js 14, TypeScript, and Canvas API.

## Features

- **Live ECG Waveform** — Canvas-rendered PQRST complex with grid overlay and sweep line, synced to patient heart rate
- **6 Vital Sign Monitors** — HR, BP (systolic/diastolic/MAP), SpO2, Temperature, Respiration Rate, EtCO2 with color-coded threshold alerts
- **Patient Selector** — 6-bed sidebar with acuity indicators (stable/guarded/critical) and diagnosis preview
- **24-Hour Vital Trends** — Switchable line charts with normal range reference lines for each vital sign
- **Medication Schedule** — Active medication list with dosing, route, frequency, and next-due timestamps
- **Lab Results** — Latest values with abnormal highlighting (HIGH/LOW/NORM) and directional trend arrows
- **Alarm Panel** — Critical/warning/info alerts with acknowledge functionality and flashing critical indicators
- **Fluid Balance** — Intake/output tracker with net balance calculation

## Tech Stack

- Next.js 14 (Pages Router)
- TypeScript
- Tailwind CSS
- Recharts
- Canvas API (ECG waveform)

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.
