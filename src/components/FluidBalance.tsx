import type { FluidRecord } from '../data/patients';

interface Props {
  fluids: FluidRecord;
}

export default function FluidBalance({ fluids }: Props) {
  const totalIn = fluids.intake.reduce((s, r) => s + r.volume, 0);
  const totalOut = fluids.output.reduce((s, r) => s + r.volume, 0);
  const balance = totalIn - totalOut;
  const balanceColor = balance >= 0 ? '#00e5ff' : '#ff80ab';

  return (
    <div className="icu-panel h-full flex flex-col">
      <div className="icu-panel-header">
        <span className="vital-label">Fluid Balance</span>
        <span className={`text-sm font-bold`} style={{ color: balanceColor }}>
          {balance >= 0 ? '+' : ''}{balance} mL
        </span>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <div className="mb-3">
          <div className="text-[10px] text-vital-blue uppercase tracking-wider mb-1">Intake ({totalIn} mL)</div>
          {fluids.intake.map((r, i) => (
            <div key={i} className="flex justify-between text-[11px] py-0.5">
              <span className="text-gray-300">{r.name}</span>
              <span className="text-vital-blue">{r.volume} mL</span>
            </div>
          ))}
        </div>
        <div>
          <div className="text-[10px] text-vital-pink uppercase tracking-wider mb-1">Output ({totalOut} mL)</div>
          {fluids.output.map((r, i) => (
            <div key={i} className="flex justify-between text-[11px] py-0.5">
              <span className="text-gray-300">{r.name}</span>
              <span className="text-vital-pink">{r.volume} mL</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}