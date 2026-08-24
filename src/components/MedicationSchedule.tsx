import type { Medication } from '../data/patients';

interface Props {
  medications: Medication[];
}

const statusColors: Record<string, string> = {
  active: '#00e676',
  held: '#ffab00',
  completed: '#448aff',
};

export default function MedicationSchedule({ medications }: Props) {
  return (
    <div className="icu-panel h-full flex flex-col">
      <div className="icu-panel-header">
        <span className="vital-label">Medications</span>
        <span className="text-[10px] text-gray-500">{medications.length} active</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {medications.map((med, i) => (
          <div key={i} className="px-3 py-2 border-b border-bg-border/50 hover:bg-bg-panel/30">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="text-xs text-white font-medium truncate">{med.name}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{med.dose} | {med.route} | {med.frequency}</div>
              </div>
              <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1" style={{ backgroundColor: statusColors[med.status] }} />
            </div>
            <div className="flex justify-between mt-1 text-[10px]">
              <span className="text-gray-500">Last: <span className="text-gray-300">{med.lastGiven}</span></span>
              <span className="text-gray-500">Next: <span className="text-gray-300">{med.nextDue}</span></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}