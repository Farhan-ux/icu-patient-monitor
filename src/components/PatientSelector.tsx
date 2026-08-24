import { Patient } from '../data/patients';
import { getAcuityColor } from '../data/patients';

interface Props {
  patients: Patient[];
  selectedIdx: number;
  onSelect: (idx: number) => void;
}

export default function PatientSelector({ patients, selectedIdx, onSelect }: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-bg-border">
        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Patient List</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {patients.map((p, i) => {
          const isActive = i === selectedIdx;
          const acuityColor = getAcuityColor(p.acuity);
          return (
            <button
              key={p.id}
              onClick={() => onSelect(i)}
              className={`w-full text-left px-3 py-2 border-b border-bg-border/50 transition-all cursor-pointer ${
                isActive
                  ? 'bg-bg-panel border-l-2'
                  : 'hover:bg-bg-panel/50 border-l-2 border-transparent'
              }`}
              style={isActive ? { borderLeftColor: acuityColor } : undefined}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-gray-300'}`}>{p.name}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{p.id} | {p.room}-{p.bed} | {p.age}{p.gender} | {p.acuity}</div>
                </div>
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: acuityColor }}
                />
              </div>
              <div className="text-[10px] text-gray-600 mt-1 truncate">{p.diagnosis}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}