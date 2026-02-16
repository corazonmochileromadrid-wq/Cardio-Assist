
import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  ShieldCheck, 
  Building2, 
  Smartphone,
  Check,
  Plus,
  UserPlus,
  Trash2,
  X,
  Languages,
  MapPin,
  Phone,
  Activity,
  PlusCircle,
  AlertTriangle,
  Zap,
  Gauge,
  Heart
} from 'lucide-react';
import { Specialist, ClinicalCenter, AlarmThresholds } from '../types';
import { Language } from '../translations';

interface SettingsProps {
  specialists: Specialist[];
  onAddSpecialist: (specialist: Specialist) => void;
  currentSpecialistId: string;
  onSwitchSpecialist: (id: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  clinicalCenter: ClinicalCenter;
  onUpdateCenter: (center: ClinicalCenter) => void;
  alarmSettings: AlarmThresholds;
  onUpdateAlarms: (alarms: AlarmThresholds) => void;
  t: any;
}

const Settings: React.FC<SettingsProps> = ({ 
  specialists, 
  onAddSpecialist, 
  currentSpecialistId, 
  onSwitchSpecialist,
  language,
  onLanguageChange,
  clinicalCenter,
  onUpdateCenter,
  alarmSettings,
  onUpdateAlarms,
  t
}) => {
  const [saved, setSaved] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeView, setActiveView] = useState<'profile' | 'management' | 'center' | 'alarms'>('profile');

  const currentSpecialist = specialists.find(s => s.id === currentSpecialistId) || specialists[0];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCenterChange = (key: keyof ClinicalCenter, value: any) => {
    onUpdateCenter({ ...clinicalCenter, [key]: value });
  };

  const handleAlarmChange = (key: keyof AlarmThresholds, value: number) => {
    onUpdateAlarms({ ...alarmSettings, [key]: value });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t.title}</h1>
          <p className="text-slate-500">{t.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-1">
          <button 
            onClick={() => setActiveView('profile')}
            className={`w-full flex items-center space-x-3 px-4 py-2 font-semibold rounded-lg transition-all border ${
              activeView === 'profile' 
              ? 'bg-white text-blue-600 shadow-sm border-slate-100' 
              : 'text-slate-600 hover:bg-slate-100 border-transparent'
            }`}
          >
            <User className="h-4 w-4" />
            <span>{t.professionalProfile}</span>
          </button>
          <button 
            onClick={() => setActiveView('management')}
            className={`w-full flex items-center space-x-3 px-4 py-2 font-semibold rounded-lg transition-all border ${
              activeView === 'management' 
              ? 'bg-white text-blue-600 shadow-sm border-slate-100' 
              : 'text-slate-600 hover:bg-slate-100 border-transparent'
            }`}
          >
            <UserPlus className="h-4 w-4" />
            <span>{t.specialistManagement}</span>
          </button>
          <button 
            onClick={() => setActiveView('center')}
            className={`w-full flex items-center space-x-3 px-4 py-2 font-semibold rounded-lg transition-all border ${
              activeView === 'center' 
              ? 'bg-white text-blue-600 shadow-sm border-slate-100' 
              : 'text-slate-600 hover:bg-slate-100 border-transparent'
            }`}
          >
            <Building2 className="h-4 w-4" />
            <span>{t.clinicalCenter}</span>
          </button>
          <button 
            onClick={() => setActiveView('alarms')}
            className={`w-full flex items-center space-x-3 px-4 py-2 font-semibold rounded-lg transition-all border ${
              activeView === 'alarms' 
              ? 'bg-white text-blue-600 shadow-sm border-slate-100' 
              : 'text-slate-600 hover:bg-slate-100 border-transparent'
            }`}
          >
            <AlertTriangle className="h-4 w-4" />
            <span>{t.alarmSettings}</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors border border-transparent">
            <Bell className="h-4 w-4" />
            <span>{t.notifications}</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors border border-transparent">
            <ShieldCheck className="h-4 w-4" />
            <span>{t.security}</span>
          </button>
        </div>

        <div className="md:col-span-2 space-y-6">
          {activeView === 'profile' && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
              <h2 className="text-lg font-bold text-slate-800 pb-4 border-b border-slate-50">{t.currentProfile}</h2>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="h-20 w-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {currentSpecialist.initials}
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-lg">{currentSpecialist.name}</p>
                    <p className="text-sm text-slate-500 font-medium">{currentSpecialist.role}</p>
                    <button className="text-blue-600 text-xs font-bold mt-1 hover:underline">{t.changePhoto}</button>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <Languages className="h-4 w-4 text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.language}</span>
                  </div>
                  <div className="flex p-1 bg-slate-200/50 rounded-lg">
                    <button 
                      onClick={() => onLanguageChange('es')}
                      className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${language === 'es' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      ES
                    </button>
                    <button 
                      onClick={() => onLanguageChange('en')}
                      className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${language === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      EN
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">{t.fullName}</label>
                  <input type="text" defaultValue={currentSpecialist.name} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">{t.license}</label>
                  <input type="text" defaultValue={currentSpecialist.licenseNumber} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">{t.email}</label>
                  <input type="email" defaultValue={currentSpecialist.email} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                </div>
              </div>
            </div>
          )}

          {activeView === 'center' && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6 animate-in slide-in-from-right-4">
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-50">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">{t.clinicalCenter}</h2>
                  <p className="text-xs text-slate-500">Configuración institucional y de infraestructura</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase flex items-center space-x-1">
                    <Activity className="h-3 w-3" />
                    <span>{t.centerName}</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all shadow-inner"
                    value={clinicalCenter.name}
                    onChange={(e) => handleCenterChange('name', e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{t.address}</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all shadow-inner"
                    value={clinicalCenter.address}
                    onChange={(e) => handleCenterChange('address', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase flex items-center space-x-1">
                      <Phone className="h-3 w-3" />
                      <span>{t.phone}</span>
                    </label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all shadow-inner"
                      value={clinicalCenter.phone}
                      onChange={(e) => handleCenterChange('phone', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-rose-400 uppercase flex items-center space-x-1">
                      <Phone className="h-3 w-3" />
                      <span>{t.emergency}</span>
                    </label>
                    <input 
                      type="text" 
                      className="w-full bg-rose-50 border border-rose-100 rounded-xl p-3 focus:ring-2 focus:ring-rose-500 outline-none text-sm transition-all text-rose-700 font-medium"
                      value={clinicalCenter.emergencyPhone}
                      onChange={(e) => handleCenterChange('emergencyPhone', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase">{t.beds}</label>
                    <input 
                      type="number" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all shadow-inner"
                      value={clinicalCenter.activeBeds}
                      onChange={(e) => handleCenterChange('activeBeds', Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'alarms' && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6 animate-in slide-in-from-right-4">
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-50">
                <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">{t.alarmThresholdsTitle}</h2>
                  <p className="text-xs text-slate-500">{t.alarmThresholdsSubtitle}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Activity className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">{t.flowMin}</span>
                  </div>
                  <input 
                    type="number" step="0.1"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all shadow-inner"
                    value={alarmSettings.flowMin}
                    onChange={(e) => handleAlarmChange('flowMin', Number(e.target.value))}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-amber-600">
                    <Zap className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">{t.powerMax}</span>
                  </div>
                  <input 
                    type="number" step="0.1"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500 outline-none text-sm transition-all shadow-inner"
                    value={alarmSettings.powerMax}
                    onChange={(e) => handleAlarmChange('powerMax', Number(e.target.value))}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-emerald-600">
                    <Smartphone className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">{t.inrMin} / {t.inrMax}</span>
                  </div>
                  <div className="flex space-x-2">
                    <input 
                      type="number" step="0.1"
                      placeholder="Min"
                      className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition-all shadow-inner"
                      value={alarmSettings.inrMin}
                      onChange={(e) => handleAlarmChange('inrMin', Number(e.target.value))}
                    />
                    <input 
                      type="number" step="0.1"
                      placeholder="Max"
                      className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition-all shadow-inner"
                      value={alarmSettings.inrMax}
                      onChange={(e) => handleAlarmChange('inrMax', Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-indigo-600">
                    <Gauge className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">{t.speedMin} / {t.speedMax}</span>
                  </div>
                  <div className="flex space-x-2">
                    <input 
                      type="number"
                      placeholder="Min"
                      className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all shadow-inner"
                      value={alarmSettings.speedMin}
                      onChange={(e) => handleAlarmChange('speedMin', Number(e.target.value))}
                    />
                    <input 
                      type="number"
                      placeholder="Max"
                      className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all shadow-inner"
                      value={alarmSettings.speedMax}
                      onChange={(e) => handleAlarmChange('speedMax', Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-rose-600">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">{t.piMin}</span>
                  </div>
                  <input 
                    type="number" step="0.1"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-rose-500 outline-none text-sm transition-all shadow-inner"
                    value={alarmSettings.piMin}
                    onChange={(e) => handleAlarmChange('piMin', Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          )}

          {activeView === 'management' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-slate-800">{t.registeredSpecialists}</h2>
                  <button 
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center space-x-2 text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-bold hover:bg-blue-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>{t.add}</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {specialists.map(s => (
                    <div 
                      key={s.id} 
                      className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                        s.id === currentSpecialistId 
                          ? 'border-blue-200 bg-blue-50/50' 
                          : 'border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm shadow-sm">
                          {s.initials}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{s.name}</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-tight">{s.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {s.id !== currentSpecialistId && (
                          <button 
                            onClick={() => onSwitchSpecialist(s.id)}
                            className="text-[10px] font-bold text-blue-600 hover:underline uppercase px-2 py-1"
                          >
                            {t.useProfile}
                          </button>
                        )}
                        <button className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button 
              onClick={handleSave}
              className={`px-8 py-2.5 rounded-xl font-bold flex items-center space-x-2 transition-all active:scale-95 ${
                saved ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700'
              }`}
            >
              {saved ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>{t.saved}</span>
                </>
              ) : (
                <span>{t.saveChanges}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddSpecialistModal 
          onClose={() => setShowAddModal(false)}
          onAdd={(data) => {
            onAddSpecialist({
              ...data,
              id: `s-${Date.now()}`,
              initials: data.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
            });
            setShowAddModal(false);
          }}
          t={t}
        />
      )}
    </div>
  );
};

interface AddSpecialistModalProps {
  onClose: () => void;
  onAdd: (data: Omit<Specialist, 'id' | 'initials'>) => void;
  t: any;
}

const AddSpecialistModal: React.FC<AddSpecialistModalProps> = ({ onClose, onAdd, t }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    institution: '',
    licenseNumber: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Registrar Especialista</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase">Nombre Completo</label>
            <input 
              type="text" 
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
              placeholder="Dr/Dra. Nombre Apellido"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase">Cargo / Especialidad</label>
            <input 
              type="text" 
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
              placeholder="Ej. Cardiólogo Intervencionista"
              value={formData.role}
              onChange={e => setFormData({...formData, role: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Colegiado Nº</label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                value={formData.licenseNumber}
                onChange={e => setFormData({...formData, licenseNumber: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Institución</label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                value={formData.institution}
                onChange={e => setFormData({...formData, institution: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase">Email Profesional</label>
            <input 
              type="email" 
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-2 text-slate-500 font-bold hover:text-slate-900 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95"
            >
              Crear Especialista
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
