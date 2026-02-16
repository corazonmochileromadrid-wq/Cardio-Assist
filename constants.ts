
import { Patient, ClinicalRecord, Specialist, ClinicalCenter, AlarmThresholds } from './types';

export const INITIAL_ALARM_SETTINGS: AlarmThresholds = {
  flowMin: 2.5,
  powerMax: 10.0,
  inrMin: 2.0,
  inrMax: 3.5,
  speedMin: 3000,
  speedMax: 9000,
  piMin: 1.0
};

const calculateMAP = (sys: number, dia: number) => Math.round((sys + 2 * dia) / 3);

const generateMockRecords = (patientId: string, count: number): ClinicalRecord[] => {
  const records: ClinicalRecord[] = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const date = new Date(now.getTime() - (count - 1 - i) * 24 * 60 * 60 * 1000);
    const systolic = 105 + Math.floor(Math.random() * 20);
    const diastolic = 70 + Math.floor(Math.random() * 15);
    records.push({
      id: `rec-${patientId}-${i}`,
      timestamp: date.toISOString(),
      lvad: {
        speed: 5500 + Math.floor(Math.random() * 200),
        flow: 4.2 + (Math.random() * 1.5),
        power: 4.5 + (Math.random() * 1.2),
        pi: 4.8 + (Math.random() * 0.8),
      },
      vitals: {
        inr: 2.1 + (Math.random() * 0.8),
        systolicBP: systolic,
        diastolicBP: diastolic,
        meanBP: calculateMAP(systolic, diastolic),
        heartRate: 72 + Math.floor(Math.random() * 15),
        temperature: 36.5 + (Math.random() * 0.5),
      }
    });
  }
  return records;
};

export const INITIAL_PATIENTS: Patient[] = [
  { id: 'p-001', name: 'Juan Perez', dateOfBirth: '1965-05-12', surgeryDate: '2023-01-15', status: 'stable', records: generateMockRecords('p-001', 5) },
  { id: 'p-002', name: 'Maria Garcia', dateOfBirth: '1972-11-20', surgeryDate: '2023-06-10', status: 'caution', records: [...generateMockRecords('p-002', 4), {
    id: 'rec-p002-recent', timestamp: new Date().toISOString(), lvad: { speed: 5800, flow: 2.4, power: 11.2, pi: 1.2 },
    vitals: { inr: 1.5, systolicBP: 85, diastolicBP: 55, meanBP: calculateMAP(85, 55), heartRate: 105, temperature: 37.2 }
  }] },
  { id: 'p-003', name: 'Carlos Mendez', dateOfBirth: '1958-03-04', surgeryDate: '2022-09-22', status: 'stable', records: generateMockRecords('p-003', 5) }
];

export const INITIAL_SPECIALISTS: Specialist[] = [
  { id: 's-001', name: 'Dra. Juana Díaz', role: 'Cardióloga Especialista', institution: 'Hospital Central', licenseNumber: 'ESP-28394', email: 'juana.diaz@hospital.org', initials: 'JD' }
];

export const INITIAL_CENTER: ClinicalCenter = {
  name: 'Hospital Central de Cardiología Avanzada',
  address: 'Av. de la Salud 450, Ciudad de México',
  phone: '+52 55 1234 5678',
  emergencyPhone: '+52 55 9999 0000',
  departments: ['Insuficiencia Cardíaca', 'Trasplante', 'LVAD Program'],
  activeBeds: 12
};
