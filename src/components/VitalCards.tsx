import { getStatusColor } from '../data/patients';
import type { Patient } from '../data/patients';

interface Props {
  vitals: Patient['vitals'];
}

function VitalCard({ label, value, unit, color, trend }: {
  label: string; value: number; unit: string; color: string; trend: string;
}) {
  const trendIcon = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';
  return (
    <div className="icu-panel px-3 py-2 flex items-center justify-between">
      <div>
        <div className="vital-label">{label}</div>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="vital-value text-2xl font-bold" style={{ color }}>{value}</span>
          <span className="text-[10px] text-gray-500">{unit}</span>
        </div>
      </div>
      <div className="text-right">
        <span className="text-sm" style={{ color }}>{trendIcon}</span>
      </div>
    </div>
  );
}

export default function VitalCards({ vitals }: Props) {
  return (
    <div className="h-full flex flex-col gap-1.5">
      <VitalCard label="HR" value={vitals.hr.value} unit={vitals.hr.unit} color={getStatusColor(vitals.hr.value, vitals.hr.low, vitals.hr.high, vitals.hr.criticalLow, vitals.hr.criticalHigh)} trend={vitals.hr.trend} />
      <VitalCard label="SpO2" value={vitals.spo2.value} unit={vitals.spo2.unit} color={getStatusColor(vitals.spo2.value, vitals.spo2.low, vitals.spo2.high, vitals.spo2.criticalLow, vitals.spo2.criticalHigh)} trend={vitals.spo2.trend} />
      <VitalCard label="TEMP" value={vitals.temp.value} unit={vitals.temp.unit} color={getStatusColor(vitals.temp.value, vitals.temp.low, vitals.temp.high, vitals.temp.criticalLow, vitals.temp.criticalHigh)} trend={vitals.temp.trend} />
      <div className="icu-panel px-3 py-2">
        <div className="vital-label">BP</div>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="vital-value text-2xl font-bold" style={{ color: getStatusColor(vitals.bp.systolic.value, vitals.bp.systolic.low, vitals.bp.systolic.high, vitals.bp.systolic.criticalLow, vitals.bp.systolic.criticalHigh) }}>{vitals.bp.systolic.value}/{vitals.bp.diastolic.value}</span>
          <span className="text-[10px] text-gray-500">mmHg</span>
        </div>
        <div className="text-[10px] text-gray-500 mt-0.5">MAP: <span style={{ color: getStatusColor(vitals.bp.map.value, vitals.bp.map.low, vitals.bp.map.high, vitals.bp.map.criticalLow, vitals.bp.map.criticalHigh) }}>{vitals.bp.map.value}</span></div>
      </div>
      <VitalCard label="RR" value={vitals.rr.value} unit={vitals.rr.unit} color={getStatusColor(vitals.rr.value, vitals.rr.low, vitals.rr.high, vitals.rr.criticalLow, vitals.rr.criticalHigh)} trend={vitals.rr.trend} />
      <VitalCard label="EtCO2" value={vitals.etco2.value} unit={vitals.etco2.unit} color={getStatusColor(vitals.etco2.value, vitals.etco2.low, vitals.etco2.high, vitals.etco2.criticalLow, vitals.etco2.criticalHigh)} trend={vitals.etco2.trend} />
    </div>
  );
}