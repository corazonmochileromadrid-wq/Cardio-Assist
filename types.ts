
export interface LVADParameters {
  speed: number;
  flow: number;
  power: number;
  pi: number;
}

export interface VitalSigns {
  inr: number;
  systolicBP: number;
  diastolicBP: number;
  meanBP: number;
  heartRate: number;
  temperature: number;
}

export interface ClinicalRecord {
  id: string;
  timestamp: string;
  lvad: LVADParameters;
  vitals: VitalSigns;
  notes?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  surgeryDate: string;
  status: 'stable' | 'caution' | 'critical';
  records: ClinicalRecord[];
}

export interface Alert {
  id: string;
  patientId: string;
  patientName: string;
  type: 'critical' | 'warning';
  message: string;
  timestamp: string;
}

export interface Specialist {
  id: string;
  name: string;
  role: string;
  institution: string;
  licenseNumber: string;
  email: string;
  initials: string;
}

export interface ClinicalCenter {
  name: string;
  address: string;
  phone: string;
  emergencyPhone: string;
  departments: string[];
  activeBeds: number;
}

export interface AlarmThresholds {
  flowMin: number;
  powerMax: number;
  inrMin: number;
  inrMax: number;
  speedMin: number;
  speedMax: number;
  piMin: number;
}
