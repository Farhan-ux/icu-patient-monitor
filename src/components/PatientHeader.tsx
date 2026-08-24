import { Patient } from '../data/patients';
import { getAcuityColor } from '../data/patients';

interface Props {
  patient: Patient;
}

export default function PatientHeader({ patient }: Props) {
  const acuityColor = getAcuityColor(patient.acuity);
  return (
    <div className="icu-panel shrink-0 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: acuityColor }} />
        <div>
          <span className="text-white font-bold text-sm">{patient.name}</span>
          <span className="text-gray-500 text-xs ml-2">{patient.id}</span>
        </div>
        <span className="text-gray-600">|</span>
        <span className="text-gray-300 text-xs">{patient.room}-{patient.bed}</span>
        <span className="text-gray-600">|</span>
        <span className="text-gray-300 text-xs">{patient.age}yo {patient.gender === 'M' ? 'Male' : 'Female'}</span>
        <span className="text-gray-600">|</span>
        <span className="text-gray-400 text-xs">{patient.diagnosis}</span>
      </div>
      <div className="flex items-center gap-4 text-xs">
        {patient.ventMode && (
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-vital-blue" />
            <span className="text-vital-blue">{patient.ventMode}</span>
          </div>
        )}
        <span className="text-gray-500">Attending: <span className="text-gray-300">{patient.attending}</span></span>
        <span className="text-gray-600">|</span>
        <span className="text-gray-500">Admitted: <span className="text-gray-400">{patient.admissionDate}</span></span>
      </div>
    </div>
  );
}