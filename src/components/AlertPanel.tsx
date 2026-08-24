import { useState } from 'react';
import type { Alert } from '../data/patients';

interface Props {
  alerts: Alert[];
}

const typeStyles: Record<string, { bg: string; color: string; label: string }> = {
  critical: { bg: 'rgba(255,23,68,0.1)', color: '#ff1744', label: 'CRIT' },
  warning:  { bg: 'rgba(255,171,0,0.1)', color: '#ffab00', label: 'WARN' },
  info:     { bg: 'rgba(68,138,255,0.1)', color: '#448aff', label: 'INFO' },
};

export default function AlertPanel({ alerts }: Props) {
  const [alertList, setAlertList] = useState(alerts);

  const acknowledge = (id: string) => {
    setAlertList(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true } : a));
  };

  const unacknowledged = alertList.filter(a => !a.acknowledged).length;

  return (
    <div className="icu-panel h-full flex flex-col">
      <div className="icu-panel-header">
        <span className="vital-label">Alerts</span>
        <div className="flex items-center gap-2">
          {unacknowledged > 0 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-clinical-critical/20 text-clinical-critical animate-pulse_vital">
              {unacknowledged} ACTIVE
            </span>
          )}
          <span className="text-[10px] text-gray-500">{alertList.length} total</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {alertList.map(alert => {
          const style = typeStyles[alert.type];
          return (
            <div
              key={alert.id}
              className={`px-3 py-2 border-b border-bg-border/50 ${!alert.acknowledged && alert.type === 'critical' ? 'animate-alarm_flash' : ''}`}
            >
              <div className="flex items-start gap-2">
                <span
                  className="text-[9px] px-1 py-0.5 rounded font-bold shrink-0 mt-0.5"
                  style={{ backgroundColor: style.bg, color: style.color }}
                >{style.label}</span>
                <div className="flex-1 min-w-0">
                  <div className={`text-[11px] ${!alert.acknowledged ? 'text-white' : 'text-gray-400'}`}>{alert.message}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] text-gray-600">{alert.timestamp}</span>
                    {!alert.acknowledged && (
                      <button
                        onClick={() => acknowledge(alert.id)}
                        className="text-[9px] text-vital-blue hover:text-vital-cyan cursor-pointer"
                      >ACK</button>
                    )}
                    {alert.acknowledged && (
                      <span className="text-[9px] text-gray-600">acknowledged</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}