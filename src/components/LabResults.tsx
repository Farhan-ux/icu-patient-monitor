import type { LabResult } from '../data/patients';

interface Props {
  labs: LabResult[];
}

function getStatus(value: number, low: number, high: number): { color: string; label: string } {
  if (value < low) return { color: '#448aff', label: 'LOW' };
  if (value > high) return { color: '#ffab00', label: 'HIGH' };
  return { color: '#00e676', label: 'NORM' };
}

export default function LabResults({ labs }: Props) {
  return (
    <div className="icu-panel h-full flex flex-col">
      <div className="icu-panel-header">
        <span className="vital-label">Lab Results</span>
        <span className="text-[10px] text-gray-500">Latest</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {labs.map((lab, i) => {
          const status = getStatus(lab.value, lab.low, lab.high);
          const trendIcon = lab.trend === 'up' ? '↑' : lab.trend === 'down' ? '↓' : '→';
          const trendColor = lab.trend === 'up' ? '#ff1744' : lab.trend === 'down' ? '#448aff' : '#00e676';
          return (
            <div key={i} className="px-3 py-1.5 border-b border-bg-border/50 flex items-center justify-between hover:bg-bg-panel/30">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-300 w-28 truncate">{lab.name}</span>
                  <span className="text-xs font-bold" style={{ color: status.color }}>{lab.value}</span>
                  <span className="text-[10px] text-gray-500">{lab.unit}</span>
                  <span className="text-[10px]" style={{ color: trendColor }}>{trendIcon}</span>
                </div>
                <div className="text-[9px] text-gray-600 mt-0.5">Ref: {lab.low}-{lab.high} {lab.unit}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ backgroundColor: status.color + '22', color: status.color }}>{status.label}</span>
                <span className="text-[9px] text-gray-600">{lab.timestamp}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}