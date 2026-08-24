export interface VitalSign {
  value: number;
  unit: string;
  low: number;
  high: number;
  criticalLow: number;
  criticalHigh: number;
  trend: 'up' | 'down' | 'stable';
  history: number[];
}

export interface Medication {
  name: string;
  dose: string;
  route: string;
  frequency: string;
  lastGiven: string;
  nextDue: string;
  status: 'active' | 'held' | 'completed';
}

export interface LabResult {
  name: string;
  value: number;
  unit: string;
  low: number;
  high: number;
  timestamp: string;
  trend: 'up' | 'down' | 'stable';
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  acknowledged: boolean;
  vital?: string;
}

export interface FluidRecord {
  intake: { name: string; volume: number; time: string }[];
  output: { name: string; volume: number; time: string }[];
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F';
  room: string;
  bed: string;
  diagnosis: string;
  attending: string;
  admissionDate: string;
  acuity: 'stable' | 'guarded' | 'critical';
  ventMode?: string;
  vasopressors?: string[];
  vitals: {
    hr: VitalSign;
    bp: { systolic: VitalSign; diastolic: VitalSign; map: VitalSign };
    spo2: VitalSign;
    temp: VitalSign;
    rr: VitalSign;
    etco2: VitalSign;
  };
  medications: Medication[];
  labs: LabResult[];
  alerts: Alert[];
  fluids: FluidRecord;
}

function genHistory(base: number, variance: number, count: number = 24): number[] {
  return Array.from({ length: count }, () =>
    +(base + (Math.random() - 0.5) * variance).toFixed(1)
  );
}

export const patients: Patient[] = [
  {
    id: 'PT-001',
    name: 'James Mitchell',
    age: 67,
    gender: 'M',
    room: 'ICU-1',
    bed: 'A',
    diagnosis: 'Septic Shock / ARDS',
    attending: 'Dr. Sarah Chen',
    admissionDate: '2024-11-15',
    acuity: 'critical',
    ventMode: 'AC/VC 16/450/40%',
    vasopressors: ['Norepinephrine 0.35 mcg/kg/min', 'Vasopressin 0.04 U/min'],
    vitals: {
      hr: { value: 112, unit: 'bpm', low: 60, high: 100, criticalLow: 50, criticalHigh: 150, trend: 'up', history: genHistory(108, 12) },
      bp: {
        systolic: { value: 88, unit: 'mmHg', low: 90, high: 140, criticalLow: 80, criticalHigh: 180, trend: 'down', history: genHistory(92, 10) },
        diastolic: { value: 52, unit: 'mmHg', low: 60, high: 90, criticalLow: 50, criticalHigh: 110, trend: 'down', history: genHistory(55, 8) },
        map: { value: 64, unit: 'mmHg', low: 65, high: 100, criticalLow: 55, criticalHigh: 120, trend: 'down', history: genHistory(67, 7) },
      },
      spo2: { value: 91, unit: '%', low: 94, high: 100, criticalLow: 88, criticalHigh: 100, trend: 'down', history: genHistory(92, 3) },
      temp: { value: 38.9, unit: '°C', low: 36, high: 38, criticalLow: 35, criticalHigh: 39.5, trend: 'up', history: genHistory(38.5, 0.8) },
      rr: { value: 28, unit: '/min', low: 12, high: 20, criticalLow: 8, criticalHigh: 30, trend: 'up', history: genHistory(26, 4) },
      etco2: { value: 32, unit: 'mmHg', low: 35, high: 45, criticalLow: 25, criticalHigh: 55, trend: 'down', history: genHistory(34, 5) },
    },
    medications: [
      { name: 'Norepinephrine', dose: '8 mg/250mL D5W', route: 'IV', frequency: 'Continuous', lastGiven: 'Running', nextDue: '-', status: 'active' },
      { name: 'Vasopressin', dose: '20 U/100mL NS', route: 'IV', frequency: 'Continuous', lastGiven: 'Running', nextDue: '-', status: 'active' },
      { name: 'Piperacillin-Tazobactam', dose: '4.5g', route: 'IV', frequency: 'q6h', lastGiven: '14:00', nextDue: '20:00', status: 'active' },
      { name: 'Fentanyl', dose: '100 mcg/hr', route: 'IV', frequency: 'Continuous', lastGiven: 'Running', nextDue: '-', status: 'active' },
      { name: 'Heparin', dose: '18 U/kg/hr', route: 'IV', frequency: 'Continuous', lastGiven: 'Running', nextDue: '-', status: 'active' },
      { name: 'Famotidine', dose: '20mg', route: 'IV', frequency: 'q12h', lastGiven: '08:00', nextDue: '20:00', status: 'active' },
    ],
    labs: [
      { name: 'WBC', value: 18.2, unit: 'K/uL', low: 4.5, high: 11, timestamp: '16:30', trend: 'up' },
      { name: 'Lactate', value: 4.8, unit: 'mmol/L', low: 0.5, high: 2, timestamp: '16:30', trend: 'up' },
      { name: 'Creatinine', value: 2.1, unit: 'mg/dL', low: 0.7, high: 1.3, timestamp: '16:30', trend: 'up' },
      { name: 'Procalcitonin', value: 12.4, unit: 'ng/mL', low: 0, high: 0.5, timestamp: '16:30', trend: 'up' },
      { name: 'Platelets', value: 98, unit: 'K/uL', low: 150, high: 400, timestamp: '16:30', trend: 'down' },
      { name: 'Hemoglobin', value: 8.4, unit: 'g/dL', low: 13, high: 17, timestamp: '16:30', trend: 'down' },
      { name: 'Bilirubin', value: 2.8, unit: 'mg/dL', low: 0.1, high: 1.2, timestamp: '16:30', trend: 'up' },
      { name: 'INR', value: 1.8, unit: '', low: 0.8, high: 1.1, timestamp: '16:30', trend: 'up' },
    ],
    alerts: [
      { id: 'a1', type: 'critical', message: 'MAP below target (<65 mmHg) for 15 min', timestamp: '16:42', acknowledged: false, vital: 'map' },
      { id: 'a2', type: 'critical', message: 'SpO2 below 92% - hypoxemia', timestamp: '16:40', acknowledged: false, vital: 'spo2' },
      { id: 'a3', type: 'warning', message: 'HR > 110 bpm - tachycardia', timestamp: '16:38', acknowledged: true, vital: 'hr' },
      { id: 'a4', type: 'warning', message: 'Temperature > 38.5°C - febrile', timestamp: '16:35', acknowledged: false, vital: 'temp' },
      { id: 'a5', type: 'info', message: 'Lactate trending up - recheck in 2h', timestamp: '16:30', acknowledged: true },
    ],
    fluids: {
      intake: [
        { name: 'NS 0.9%', volume: 500, time: '14:00' },
        { name: 'LR', volume: 250, time: '15:30' },
        { name: 'Blood Products (PRBC)', volume: 350, time: '16:00' },
        { name: 'TPN', volume: 200, time: '12:00' },
      ],
      output: [
        { name: 'Urine', volume: 120, time: '16:00' },
        { name: 'Foley', volume: 80, time: '15:00' },
        { name: 'Drain (chest)', volume: 45, time: '16:00' },
      ],
    },
  },
  {
    id: 'PT-002',
    name: 'Maria Rodriguez',
    age: 54,
    gender: 'F',
    room: 'ICU-1',
    bed: 'B',
    diagnosis: 'Post-CABG x3',
    attending: 'Dr. Michael Park',
    admissionDate: '2024-11-18',
    acuity: 'guarded',
    ventMode: 'CPAP/PS 5/10',
    vitals: {
      hr: { value: 78, unit: 'bpm', low: 60, high: 100, criticalLow: 50, criticalHigh: 150, trend: 'stable', history: genHistory(76, 6) },
      bp: {
        systolic: { value: 118, unit: 'mmHg', low: 90, high: 140, criticalLow: 80, criticalHigh: 180, trend: 'stable', history: genHistory(120, 8) },
        diastolic: { value: 68, unit: 'mmHg', low: 60, high: 90, criticalLow: 50, criticalHigh: 110, trend: 'stable', history: genHistory(70, 5) },
        map: { value: 85, unit: 'mmHg', low: 65, high: 100, criticalLow: 55, criticalHigh: 120, trend: 'stable', history: genHistory(86, 5) },
      },
      spo2: { value: 97, unit: '%', low: 94, high: 100, criticalLow: 88, criticalHigh: 100, trend: 'stable', history: genHistory(97, 1.5) },
      temp: { value: 37.1, unit: '°C', low: 36, high: 38, criticalLow: 35, criticalHigh: 39.5, trend: 'stable', history: genHistory(37.0, 0.3) },
      rr: { value: 16, unit: '/min', low: 12, high: 20, criticalLow: 8, criticalHigh: 30, trend: 'stable', history: genHistory(15, 3) },
      etco2: { value: 38, unit: 'mmHg', low: 35, high: 45, criticalLow: 25, criticalHigh: 55, trend: 'stable', history: genHistory(37, 3) },
    },
    medications: [
      { name: 'Amiodarone', dose: '150mg/100mL D5W', route: 'IV', frequency: 'Continuous', lastGiven: 'Running', nextDue: '-', status: 'active' },
      { name: 'Metoprolol', dose: '25mg', route: 'PO', frequency: 'BID', lastGiven: '08:00', nextDue: '20:00', status: 'active' },
      { name: 'Heparin', dose: '14 U/kg/hr', route: 'IV', frequency: 'Continuous', lastGiven: 'Running', nextDue: '-', status: 'active' },
      { name: 'Aspirin', dose: '81mg', route: 'PO', frequency: 'Daily', lastGiven: '08:00', nextDue: '08:00', status: 'active' },
      { name: 'Atorvastatin', dose: '40mg', route: 'PO', frequency: 'Daily', lastGiven: '08:00', nextDue: '08:00', status: 'active' },
    ],
    labs: [
      { name: 'Troponin I', value: 0.08, unit: 'ng/mL', low: 0, high: 0.04, timestamp: '16:00', trend: 'down' },
      { name: 'CK-MB', value: 15, unit: 'U/L', low: 0, high: 25, timestamp: '16:00', trend: 'down' },
      { name: 'BNP', value: 320, unit: 'pg/mL', low: 0, high: 100, timestamp: '16:00', trend: 'down' },
      { name: 'Creatinine', value: 1.0, unit: 'mg/dL', low: 0.7, high: 1.3, timestamp: '16:00', trend: 'stable' },
      { name: 'Potassium', value: 4.2, unit: 'mEq/L', low: 3.5, high: 5.0, timestamp: '16:00', trend: 'stable' },
      { name: 'INR', value: 2.1, unit: '', low: 0.8, high: 1.1, timestamp: '16:00', trend: 'up' },
    ],
    alerts: [
      { id: 'b1', type: 'info', message: 'INR above target - hold heparin? Consult cardiology', timestamp: '16:00', acknowledged: false },
      { id: 'b2', type: 'info', message: 'Chest tube output <50mL/hr x 4hr - eval for removal', timestamp: '15:30', acknowledged: true },
    ],
    fluids: {
      intake: [
        { name: 'NS 0.9% + KCl 20mEq', volume: 1000, time: '12:00' },
        { name: 'D5W', volume: 500, time: '14:00' },
      ],
      output: [
        { name: 'Urine', volume: 450, time: '16:00' },
        { name: 'Chest Tube (L)', volume: 35, time: '16:00' },
        { name: 'Chest Tube (R)', volume: 20, time: '16:00' },
      ],
    },
  },
  {
    id: 'PT-003',
    name: 'Robert Kim',
    age: 43,
    gender: 'M',
    room: 'ICU-2',
    bed: 'A',
    diagnosis: 'Acute Pancreatitis / MODS',
    attending: 'Dr. Lisa Wong',
    admissionDate: '2024-11-20',
    acuity: 'guarded',
    vitals: {
      hr: { value: 96, unit: 'bpm', low: 60, high: 100, criticalLow: 50, criticalHigh: 150, trend: 'up', history: genHistory(92, 8) },
      bp: {
        systolic: { value: 134, unit: 'mmHg', low: 90, high: 140, criticalLow: 80, criticalHigh: 180, trend: 'stable', history: genHistory(130, 12) },
        diastolic: { value: 82, unit: 'mmHg', low: 60, high: 90, criticalLow: 50, criticalHigh: 110, trend: 'stable', history: genHistory(80, 6) },
        map: { value: 99, unit: 'mmHg', low: 65, high: 100, criticalLow: 55, criticalHigh: 120, trend: 'stable', history: genHistory(97, 7) },
      },
      spo2: { value: 95, unit: '%', low: 94, high: 100, criticalLow: 88, criticalHigh: 100, trend: 'stable', history: genHistory(95, 2) },
      temp: { value: 37.8, unit: '°C', low: 36, high: 38, criticalLow: 35, criticalHigh: 39.5, trend: 'up', history: genHistory(37.5, 0.5) },
      rr: { value: 22, unit: '/min', low: 12, high: 20, criticalLow: 8, criticalHigh: 30, trend: 'up', history: genHistory(20, 3) },
      etco2: { value: 36, unit: 'mmHg', low: 35, high: 45, criticalLow: 25, criticalHigh: 55, trend: 'stable', history: genHistory(37, 3) },
    },
    medications: [
      { name: 'Hydromorphone PCA', dose: '0.2mg demand', route: 'IV', frequency: 'PRN', lastGiven: '16:15', nextDue: 'PRN', status: 'active' },
      { name: 'Ondansetron', dose: '4mg', route: 'IV', frequency: 'q8h', lastGiven: '14:00', nextDue: '22:00', status: 'active' },
      { name: 'Pantoprazole', dose: '40mg', route: 'IV', frequency: 'BID', lastGiven: '08:00', nextDue: '20:00', status: 'active' },
      { name: 'LR', dose: '125 mL/hr', route: 'IV', frequency: 'Continuous', lastGiven: 'Running', nextDue: '-', status: 'active' },
    ],
    labs: [
      { name: 'Lipase', value: 1250, unit: 'U/L', low: 0, high: 60, timestamp: '15:00', trend: 'down' },
      { name: 'WBC', value: 14.5, unit: 'K/uL', low: 4.5, high: 11, timestamp: '15:00', trend: 'stable' },
      { name: 'Hemoglobin', value: 11.2, unit: 'g/dL', low: 13, high: 17, timestamp: '15:00', trend: 'stable' },
      { name: 'Calcium', value: 7.8, unit: 'mg/dL', low: 8.5, high: 10.5, timestamp: '15:00', trend: 'down' },
      { name: 'Triglycerides', value: 680, unit: 'mg/dL', low: 0, high: 150, timestamp: '15:00', trend: 'down' },
    ],
    alerts: [
      { id: 'c1', type: 'warning', message: 'HR trending up - pain? reassess', timestamp: '16:30', acknowledged: false, vital: 'hr' },
      { id: 'c2', type: 'warning', message: 'Corrected calcium low (7.8) - replete', timestamp: '15:00', acknowledged: false },
    ],
    fluids: {
      intake: [
        { name: 'LR', volume: 1000, time: '12:00' },
        { name: 'NS 0.9%', volume: 500, time: '14:00' },
      ],
      output: [
        { name: 'Urine', volume: 350, time: '16:00' },
        { name: 'NG Tube', volume: 280, time: '16:00' },
      ],
    },
  },
  {
    id: 'PT-004',
    name: 'Eleanor Vance',
    age: 78,
    gender: 'F',
    room: 'ICU-2',
    bed: 'B',
    diagnosis: 'Status Epilepticus / Encephalopathy',
    attending: 'Dr. Sarah Chen',
    admissionDate: '2024-11-21',
    acuity: 'critical',
    ventMode: 'CMV 14/350/35%',
    vitals: {
      hr: { value: 62, unit: 'bpm', low: 60, high: 100, criticalLow: 50, criticalHigh: 150, trend: 'stable', history: genHistory(64, 5) },
      bp: {
        systolic: { value: 142, unit: 'mmHg', low: 90, high: 140, criticalLow: 80, criticalHigh: 180, trend: 'up', history: genHistory(138, 10) },
        diastolic: { value: 88, unit: 'mmHg', low: 60, high: 90, criticalLow: 50, criticalHigh: 110, trend: 'up', history: genHistory(84, 6) },
        map: { value: 106, unit: 'mmHg', low: 65, high: 100, criticalLow: 55, criticalHigh: 120, trend: 'up', history: genHistory(102, 7) },
      },
      spo2: { value: 98, unit: '%', low: 94, high: 100, criticalLow: 88, criticalHigh: 100, trend: 'stable', history: genHistory(98, 1) },
      temp: { value: 36.2, unit: '°C', low: 36, high: 38, criticalLow: 35, criticalHigh: 39.5, trend: 'down', history: genHistory(36.4, 0.4) },
      rr: { value: 14, unit: '/min', low: 12, high: 20, criticalLow: 8, criticalHigh: 30, trend: 'stable', history: genHistory(14, 2) },
      etco2: { value: 40, unit: 'mmHg', low: 35, high: 45, criticalLow: 25, criticalHigh: 55, trend: 'stable', history: genHistory(39, 3) },
    },
    medications: [
      { name: 'Propofol', dose: '40 mcg/kg/min', route: 'IV', frequency: 'Continuous', lastGiven: 'Running', nextDue: '-', status: 'active' },
      { name: 'Levetiracetam', dose: '1g', route: 'IV', frequency: 'BID', lastGiven: '14:00', nextDue: '02:00', status: 'active' },
      { name: 'Lacosamide', dose: '200mg', route: 'IV', frequency: 'BID', lastGiven: '14:00', nextDue: '02:00', status: 'active' },
      { name: 'Nicardipine', dose: '5 mg/hr', route: 'IV', frequency: 'Continuous', lastGiven: 'Running', nextDue: '-', status: 'active' },
      { name: 'Dexamethasone', dose: '4mg', route: 'IV', frequency: 'q6h', lastGiven: '14:00', nextDue: '20:00', status: 'active' },
    ],
    labs: [
      { name: 'WBC', value: 12.8, unit: 'K/uL', low: 4.5, high: 11, timestamp: '16:00', trend: 'up' },
      { name: 'Sodium', value: 128, unit: 'mEq/L', low: 136, high: 145, timestamp: '16:00', trend: 'down' },
      { name: 'Glucose', value: 185, unit: 'mg/dL', low: 70, high: 140, timestamp: '16:00', trend: 'up' },
      { name: 'Magnesium', value: 1.8, unit: 'mg/dL', low: 1.7, high: 2.2, timestamp: '16:00', trend: 'stable' },
      { name: 'Ammonia', value: 68, unit: 'mcg/dL', low: 0, high: 50, timestamp: '16:00', trend: 'up' },
    ],
    alerts: [
      { id: 'd1', type: 'critical', message: 'Sodium 128 - severe hyponatremia', timestamp: '16:00', acknowledged: false },
      { id: 'd2', type: 'warning', message: 'BP above target - increase nicardipine?', timestamp: '16:25', acknowledged: false, vital: 'bp' },
      { id: 'd3', type: 'warning', message: 'Ammonia elevated - Lactulose PRN', timestamp: '16:00', acknowledged: true },
    ],
    fluids: {
      intake: [
        { name: 'NS 0.9%', volume: 750, time: '12:00' },
        { name: '3% NaCl', volume: 150, time: '15:00' },
        { name: 'TPN', volume: 180, time: '10:00' },
      ],
      output: [
        { name: 'Urine', volume: 520, time: '16:00' },
        { name: 'Foley', volume: 180, time: '15:00' },
      ],
    },
  },
  {
    id: 'PT-005',
    name: 'David Thompson',
    age: 35,
    gender: 'M',
    room: 'ICU-3',
    bed: 'A',
    diagnosis: 'Traumatic Brain Injury / SDH Evacuation',
    attending: 'Dr. Michael Park',
    admissionDate: '2024-11-22',
    acuity: 'guarded',
    vitals: {
      hr: { value: 68, unit: 'bpm', low: 60, high: 100, criticalLow: 50, criticalHigh: 150, trend: 'stable', history: genHistory(70, 4) },
      bp: {
        systolic: { value: 126, unit: 'mmHg', low: 90, high: 140, criticalLow: 80, criticalHigh: 180, trend: 'stable', history: genHistory(124, 6) },
        diastolic: { value: 74, unit: 'mmHg', low: 60, high: 90, criticalLow: 50, criticalHigh: 110, trend: 'stable', history: genHistory(72, 4) },
        map: { value: 91, unit: 'mmHg', low: 65, high: 100, criticalLow: 55, criticalHigh: 120, trend: 'stable', history: genHistory(89, 4) },
      },
      spo2: { value: 99, unit: '%', low: 94, high: 100, criticalLow: 88, criticalHigh: 100, trend: 'stable', history: genHistory(99, 0.8) },
      temp: { value: 36.8, unit: '°C', low: 36, high: 38, criticalLow: 35, criticalHigh: 39.5, trend: 'stable', history: genHistory(36.9, 0.2) },
      rr: { value: 14, unit: '/min', low: 12, high: 20, criticalLow: 8, criticalHigh: 30, trend: 'stable', history: genHistory(14, 2) },
      etco2: { value: 39, unit: 'mmHg', low: 35, high: 45, criticalLow: 25, criticalHigh: 55, trend: 'stable', history: genHistory(38, 2) },
    },
    medications: [
      { name: 'Hypertonic Saline 3%', dose: '75 mL/hr', route: 'IV', frequency: 'Continuous', lastGiven: 'Running', nextDue: '-', status: 'active' },
      { name: 'Levetiracetam', dose: '750mg', route: 'IV', frequency: 'BID', lastGiven: '14:00', nextDue: '02:00', status: 'active' },
      { name: 'Mannitol', dose: '100g', route: 'IV', frequency: 'q4h PRN', lastGiven: '16:00', nextDue: 'PRN', status: 'active' },
      { name: 'Fentanyl', dose: '50 mcg/hr', route: 'IV', frequency: 'Continuous', lastGiven: 'Running', nextDue: '-', status: 'active' },
    ],
    labs: [
      { name: 'Sodium', value: 148, unit: 'mEq/L', low: 136, high: 145, timestamp: '16:00', trend: 'up' },
      { name: 'Glucose', value: 142, unit: 'mg/dL', low: 70, high: 140, timestamp: '16:00', trend: 'up' },
      { name: 'Hemoglobin', value: 10.8, unit: 'g/dL', low: 13, high: 17, timestamp: '16:00', trend: 'stable' },
      { name: 'Platelets', value: 145, unit: 'K/uL', low: 150, high: 400, timestamp: '16:00', trend: 'down' },
    ],
    alerts: [
      { id: 'e1', type: 'warning', message: 'Sodium 148 - hypernatremia, monitor ICP', timestamp: '16:00', acknowledged: true },
      { id: 'e2', type: 'info', message: 'Platelets 145 - borderline, recheck in 6h', timestamp: '16:00', acknowledged: false },
    ],
    fluids: {
      intake: [
        { name: '3% NaCl', volume: 600, time: '12:00' },
        { name: 'NS 0.9%', volume: 250, time: '14:00' },
      ],
      output: [
        { name: 'Urine', volume: 800, time: '16:00' },
        { name: 'EVD', volume: 15, time: '16:00' },
      ],
    },
  },
  {
    id: 'PT-006',
    name: 'Susan Okafor',
    age: 61,
    gender: 'F',
    room: 'ICU-3',
    bed: 'B',
    diagnosis: 'Community Acquired Pneumonia / Respiratory Failure',
    attending: 'Dr. Lisa Wong',
    admissionDate: '2024-11-23',
    acuity: 'stable',
    vitals: {
      hr: { value: 82, unit: 'bpm', low: 60, high: 100, criticalLow: 50, criticalHigh: 150, trend: 'stable', history: genHistory(80, 5) },
      bp: {
        systolic: { value: 128, unit: 'mmHg', low: 90, high: 140, criticalLow: 80, criticalHigh: 180, trend: 'stable', history: genHistory(126, 8) },
        diastolic: { value: 76, unit: 'mmHg', low: 60, high: 90, criticalLow: 50, criticalHigh: 110, trend: 'stable', history: genHistory(78, 5) },
        map: { value: 93, unit: 'mmHg', low: 65, high: 100, criticalLow: 55, criticalHigh: 120, trend: 'stable', history: genHistory(94, 5) },
      },
      spo2: { value: 96, unit: '%', low: 94, high: 100, criticalLow: 88, criticalHigh: 100, trend: 'stable', history: genHistory(96, 1.5) },
      temp: { value: 37.4, unit: '°C', low: 36, high: 38, criticalLow: 35, criticalHigh: 39.5, trend: 'down', history: genHistory(37.8, 0.4) },
      rr: { value: 18, unit: '/min', low: 12, high: 20, criticalLow: 8, criticalHigh: 30, trend: 'down', history: genHistory(20, 2) },
      etco2: { value: 37, unit: 'mmHg', low: 35, high: 45, criticalLow: 25, criticalHigh: 55, trend: 'stable', history: genHistory(38, 2) },
    },
    medications: [
      { name: 'Ceftriaxone', dose: '2g', route: 'IV', frequency: 'Daily', lastGiven: '08:00', nextDue: '08:00', status: 'active' },
      { name: 'Azithromycin', dose: '500mg', route: 'IV', frequency: 'Daily', lastGiven: '08:00', nextDue: '08:00', status: 'active' },
      { name: 'Albuterol', dose: '2.5mg', route: 'INH', frequency: 'q4h', lastGiven: '16:00', nextDue: '20:00', status: 'active' },
      { name: 'Heparin', dose: '5000 U', route: 'SC', frequency: 'q8h', lastGiven: '14:00', nextDue: '22:00', status: 'active' },
    ],
    labs: [
      { name: 'WBC', value: 11.8, unit: 'K/uL', low: 4.5, high: 11, timestamp: '16:00', trend: 'down' },
      { name: 'Procalcitonin', value: 1.2, unit: 'ng/mL', low: 0, high: 0.5, timestamp: '16:00', trend: 'down' },
      { name: 'CRP', value: 45, unit: 'mg/L', low: 0, high: 10, timestamp: '16:00', trend: 'down' },
      { name: 'Creatinine', value: 0.9, unit: 'mg/dL', low: 0.7, high: 1.3, timestamp: '16:00', trend: 'stable' },
    ],
    alerts: [
      { id: 'f1', type: 'info', message: 'WBC and CRP trending down - clinical improvement', timestamp: '16:00', acknowledged: true },
    ],
    fluids: {
      intake: [
        { name: 'PO Intake', volume: 600, time: '16:00' },
        { name: 'NS 0.9%', volume: 250, time: '14:00' },
      ],
      output: [
        { name: 'Urine', volume: 550, time: '16:00' },
      ],
    },
  },
];

export function getStatusColor(value: number, low: number, high: number, cLow: number, cHigh: number): string {
  if (value <= cLow || value >= cHigh) return '#ff1744';
  if (value < low || value > high) return '#ffab00';
  return '#00e676';
}

export function getAcuityColor(acuity: string): string {
  switch (acuity) {
    case 'critical': return '#ff1744';
    case 'guarded': return '#ffab00';
    case 'stable': return '#00e676';
    default: return '#448aff';
  }
}
