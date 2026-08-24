import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import type { Patient } from '../data/patients';

interface Props {
  vitals: Patient['vitals'];
}

type VitalKey = 'hr' | 'spo2' | 'temp' | 'rr' | 'etco2' | 'map';

const vitalOptions: { key: VitalKey; label: string; color: string; unit: string; range: [number, number] }[] = [
  { key: 'hr', label: 'Heart Rate', color: '#00e676', unit: 'bpm', range: [40, 160] },
  { key: 'spo2', label: 'SpO2', color: '#00e5ff', unit: '%', range: [85, 100] },
  { key: 'temp', label: 'Temperature', color: '#ffab00', unit: '°C', range: [35, 40] },
  { key: 'rr', label: 'Respiration', color: '#b388ff', unit: '/min', range: [5, 35] },
  { key: 'etco2', label: 'EtCO2', color: '#ff80ab', unit: 'mmHg', range: [20, 60] },
  { key: 'map', label: 'MAP', color: '#448aff', unit: 'mmHg', range: [40, 130] },
];

export default function VitalTrends({ vitals }: Props) {
  const [selected, setSelected] = useState<VitalKey>('hr');
  const opt = vitalOptions.find(o => o.key === selected)!;

  let data: number[];
  let low: number, high: number;
  if (selected === 'map') {
    data = vitals.bp.map.history;
    low = vitals.bp.map.low;
    high = vitals.bp.map.high;
  } else {
    data = vitals[selected].history;
    low = vitals[selected].low;
    high = vitals[selected].high;
  }

  const chartData = data.map((v, i) => ({ hour: `${i}h`, value: v }));

  return (
    <div className="icu-panel h-full flex flex-col">
      <div className="icu-panel-header">
        <span className="vital-label">Vital Trends</span>
      </div>
      <div className="flex gap-1 px-3 py-1.5 border-b border-bg-border overflow-x-auto shrink-0">
        {vitalOptions.map(o => (
          <button
            key={o.key}
            onClick={() => setSelected(o.key)}
            className={`px-2 py-0.5 rounded text-[10px] shrink-0 cursor-pointer transition-colors ${
              selected === o.key ? 'text-white' : 'text-gray-500 hover:text-gray-300'
            }`}
            style={selected === o.key ? { backgroundColor: o.color + '22', color: o.color } : undefined}
          >{o.label}</button>
        ))}
      </div>
      <div className="flex-1 min-h-0 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="hour" tick={{ fontSize: 9, fill: '#4a5568' }} axisLine={false} tickLine={false} />
            <YAxis domain={opt.range} tick={{ fontSize: 9, fill: '#4a5568' }} axisLine={false} tickLine={false} width={35} />
            <Tooltip contentStyle={{ backgroundColor: '#0d1526', border: '1px solid #1a2744', fontSize: 11, borderRadius: 4 }} />
            <ReferenceLine y={low} stroke="#ffab00" strokeDasharray="4 4" strokeOpacity={0.5} />
            <ReferenceLine y={high} stroke="#ffab00" strokeDasharray="4 4" strokeOpacity={0.5} />
            <Line type="monotone" dataKey="value" stroke={opt.color} dot={false} strokeWidth={1.5} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}