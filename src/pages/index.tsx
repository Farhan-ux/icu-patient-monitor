import type { NextPage } from 'next';
import { useState } from 'react';
import { patients } from '../data/patients';
import PatientSelector from '../components/PatientSelector';
import PatientHeader from '../components/PatientHeader';
import VitalCards from '../components/VitalCards';
import ECGWaveform from '../components/ECGWaveform';
import VitalTrends from '../components/VitalTrends';
import MedicationSchedule from '../components/MedicationSchedule';
import LabResults from '../components/LabResults';
import AlertPanel from '../components/AlertPanel';
import FluidBalance from '../components/FluidBalance';

const Home: NextPage = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const patient = patients[selectedIdx];

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="h-screen w-screen flex flex-col bg-bg-primary overflow-hidden">
      {/* Top Status Bar */}
      <header className="h-10 bg-bg-card border-b border-bg-border flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-vital-green font-bold text-sm tracking-wider">ICU</span>
          <span className="text-vital-blue text-xs">PATIENT MONITOR</span>
          <span className="text-gray-600 text-[10px]">|</span>
          <span className="text-gray-400 text-[10px]">{patients.length} BEDS ACTIVE</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] text-gray-500">
          <span>NETWORK: <span className="text-vital-green">ONLINE</span></span>
          <span>EMR: <span className="text-vital-green">CONNECTED</span></span>
          <span>ALARM: <span className="text-vital-green">ARMED</span></span>
          <span>{dateStr}</span>
          <span className="text-white font-mono text-xs">{timeStr}</span>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Left Sidebar - Patient Selector */}
        <aside className="w-56 bg-bg-card border-r border-bg-border shrink-0 flex flex-col">
          <PatientSelector
            patients={patients}
            selectedIdx={selectedIdx}
            onSelect={setSelectedIdx}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 p-2 gap-2">
          {/* Patient Header */}
          <PatientHeader patient={patient} />

          {/* Row 1: ECG + Vital Cards */}
          <div className="flex gap-2 flex-1 min-h-0">
            {/* ECG Waveform - takes more space */}
            <div className="flex-[3] min-w-0">
              <ECGWaveform patientId={patient.id} heartRate={patient.vitals.hr.value} />
            </div>
            {/* Vital Cards - right side */}
            <div className="w-80 shrink-0">
              <VitalCards vitals={patient.vitals} />
            </div>
          </div>

          {/* Row 2: Trends + Meds + Labs + Alerts + Fluids */}
          <div className="flex gap-2" style={{ height: '38%' }}>
            <div className="flex-1 min-w-0">
              <VitalTrends vitals={patient.vitals} />
            </div>
            <div className="flex-1 min-w-0 flex flex-col gap-2">
              <div className="flex-1 min-h-0">
                <AlertPanel alerts={patient.alerts} />
              </div>
              <div className="flex-1 min-h-0">
                <FluidBalance fluids={patient.fluids} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <LabResults labs={patient.labs} />
            </div>
            <div className="w-72 shrink-0">
              <MedicationSchedule medications={patient.medications} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;