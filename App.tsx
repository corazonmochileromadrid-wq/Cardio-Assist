
import React, { useState, useMemo } from 'react';
import { INITIAL_PATIENTS, INITIAL_SPECIALISTS, INITIAL_CENTER, INITIAL_ALARM_SETTINGS } from './constants';
import { Patient, Alert, ClinicalRecord, Specialist, ClinicalCenter, AlarmThresholds } from './types';
import { translations, Language } from './translations';
import Dashboard from './components/Dashboard';
import PatientList from './components/PatientList';
import PatientDetails from './components/PatientDetails';
import DoctorManagement from './components/DoctorManagement';
import Sidebar from './components/Sidebar';
import Settings from './components/Settings';
import { Bell, Search } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'patients' | 'doctors' | 'details' | 'settings'>('dashboard');
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [specialists, setSpecialists] = useState<Specialist[]>(INITIAL_SPECIALISTS);
  const [currentSpecialistId, setCurrentSpecialistId] = useState<string>(INITIAL_SPECIALISTS[0].id);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState<Language>('es');
  const [clinicalCenter, setClinicalCenter] = useState<ClinicalCenter>(INITIAL_CENTER);
  const [alarmSettings, setAlarmSettings] = useState<AlarmThresholds>(INITIAL_ALARM_SETTINGS);

  const t = translations[language];
  const currentSpecialist = useMemo(() => specialists.find(s => s.id === currentSpecialistId) || specialists[0], [specialists, currentSpecialistId]);

  const alerts = useMemo((): Alert[] => {
    const allAlerts: Alert[] = [];
    patients.forEach(p => {
      const latest = p.records[p.records.length - 1];
      if (!latest) return;
      if (latest.lvad.flow < alarmSettings.flowMin) allAlerts.push({ id: `f-${p.id}`, patientId: p.id, patientName: p.name, type: 'critical', message: `Flujo Bajo: ${latest.lvad.flow} L/min`, timestamp: latest.timestamp });
      if (latest.lvad.power >= alarmSettings.powerMax) allAlerts.push({ id: `p-${p.id}`, patientId: p.id, patientName: p.name, type: 'critical', message: `Potencia Alta: ${latest.lvad.power} W`, timestamp: latest.timestamp });
      if (latest.vitals.inr < alarmSettings.inrMin) allAlerts.push({ id: `i-${p.id}`, patientId: p.id, patientName: p.name, type: 'warning', message: `INR Bajo: ${latest.vitals.inr}`, timestamp: latest.timestamp });
    });
    return allAlerts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [patients, alarmSettings]);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} t={t.sidebar} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input type="text" placeholder={t.header.searchPlaceholder} className="pl-10 pr-4 py-2 bg-slate-100 rounded-lg text-sm w-64" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative p-2 text-slate-500"><Bell className="h-5 w-5" />{alerts.length > 0 && <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>}</div>
            <div className="h-8 w-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">{currentSpecialist.initials}</div>
            <span className="text-sm font-medium text-slate-700">{currentSpecialist.name}</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8">
          {activeTab === 'dashboard' && <Dashboard patients={patients} alerts={alerts} onSelectPatient={id => { setSelectedPatientId(id); setActiveTab('details'); }} t={t.dashboard} />}
          {activeTab === 'patients' && <PatientList patients={patients.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))} onSelectPatient={id => { setSelectedPatientId(id); setActiveTab('details'); }} t={t.patientList} />}
          {activeTab === 'details' && selectedPatientId && <PatientDetails patient={patients.find(p => p.id === selectedPatientId)!} onAddRecord={(pid, rec) => setPatients(prev => prev.map(p => p.id === pid ? { ...p, records: [...p.records, rec], status: rec.lvad.flow < alarmSettings.flowMin ? 'critical' : 'stable' } : p))} onBack={() => setActiveTab('patients')} t={t.patientDetails} tAdd={t.addRecord} />}
          {activeTab === 'doctors' && <DoctorManagement specialists={specialists} currentSpecialistId={currentSpecialistId} onSwitchSpecialist={setCurrentSpecialistId} onAddSpecialist={s => setSpecialists([...specialists, s])} onRemoveSpecialist={id => setSpecialists(specialists.filter(s => s.id !== id))} t={t.doctorManagement} />}
          {activeTab === 'settings' && <Settings specialists={specialists} onAddSpecialist={s => setSpecialists([...specialists, s])} currentSpecialistId={currentSpecialistId} onSwitchSpecialist={setCurrentSpecialistId} language={language} onLanguageChange={setLanguage} clinicalCenter={clinicalCenter} onUpdateCenter={setClinicalCenter} alarmSettings={alarmSettings} onUpdateAlarms={setAlarmSettings} t={t.settings} />}
        </main>
      </div>
    </div>
  );
};
export default App;
