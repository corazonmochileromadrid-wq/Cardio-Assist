
import React, { useState, useEffect } from 'react';
import { Patient, ClinicalRecord, VitalSigns, LVADParameters } from '../types';
// Removed unused import causing compilation error
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import { 
  ArrowLeft, 
  Plus, 
  ChevronRight, 
  Activity, 
  Thermometer, 
  Droplet,
  Zap,
  Gauge,
  Heart,
  X
} from 'lucide-react';

interface PatientDetailsProps {
  patient: Patient;
  onAddRecord: (patientId: string, record: ClinicalRecord) => void;
  onBack: () => void;
  t: any;
  tAdd: any;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patient, onAddRecord, onBack, t, tAdd }) => {
  const [activeView, setActiveView] = useState<'trends' | 'history'>('trends');
  const [showAddModal, setShowAddModal] = useState(false);

  const latest = patient.records[patient.records.length - 1];

  // Formatting chart data
  const chartData = patient.records.map(r => ({
    time: new Date(r.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    flow: r.lvad.flow,
    power: r.lvad.power,
    pi: r.lvad.pi,
    inr: r.vitals.inr,
    hr: r.vitals.heartRate,
    meanBP: r.vitals.meanBP,
    speed: r.lvad.speed / 1000 // scaling for graph readability
  }));

  const lvadStats = [
    { label: t.stats.speed, value: latest?.lvad.speed, unit: 'RPM', icon: Gauge, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: t.stats.flow, value: latest?.lvad.flow, unit: 'L/min', icon: Activity, color: latest?.lvad.flow < 3 ? 'text-rose-600' : 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: t.stats.power, value: latest?.lvad.power, unit: 'W', icon: Zap, color: latest?.lvad.power >= 8 ? 'text-amber-600' : 'text-slate-600', bg: 'bg-slate-100' },
    { label: t.stats.pi, value: latest?.lvad.pi, unit: '', icon: Heart, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">{t.back}</span>
        </button>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-md transition-all active:scale-95"
        >
          <Plus className="h-4 w-4" />
          <span>{t.addRecord}</span>
        </button>
      </div>

      {/* Patient Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <div className="w-16 h-16 bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-2xl rounded-2xl border-2 border-white shadow-sm">
            {patient.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{patient.name}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-slate-500">
              <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">{t.profile.id}: {patient.id}</span>
              <span>{t.profile.dob}: {new Date(patient.dateOfBirth).toLocaleDateString()}</span>
              <span>•</span>
              <span>{t.profile.surgery}: {new Date(patient.surgeryDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className={`px-4 py-2 rounded-xl text-sm font-bold border-2 ${
            patient.status === 'stable' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
            patient.status === 'caution' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-rose-50 text-rose-700 border-rose-100'
          }`}>
            {t.profile.status}: {patient.status.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Real-time Parameters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {lvadStats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-16 h-16 ${stat.bg} -mr-4 -mt-4 rounded-full opacity-50 group-hover:scale-110 transition-transform`}></div>
            <div className="flex items-center space-x-3 mb-3">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</span>
            </div>
            <div className="flex items-baseline space-x-1">
              <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
              <span className="text-xs font-bold text-slate-400">{stat.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex space-x-8">
          <button 
            onClick={() => setActiveView('trends')}
            className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all ${
              activeView === 'trends' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {t.tabs.trends}
          </button>
          <button 
            onClick={() => setActiveView('history')}
            className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all ${
              activeView === 'history' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {t.tabs.history}
          </button>
        </div>
      </div>

      {activeView === 'trends' ? (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center space-x-2">
              <Activity className="h-5 w-5 text-emerald-500" />
              <span>{t.charts.performanceTitle}</span>
            </h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorFlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                  />
                  <Legend iconType="circle" />
                  <Area type="monotone" dataKey="flow" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorFlow)" name={t.charts.flowLegend} />
                  <Line type="monotone" dataKey="power" stroke="#f59e0b" strokeWidth={3} dot={{r: 4}} name={t.charts.powerLegend} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center space-x-2">
              <Droplet className="h-5 w-5 text-blue-500" />
              <span>{t.charts.anticoagulationTitle}</span>
            </h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                  />
                  <Legend iconType="circle" />
                  <Line type="step" dataKey="inr" stroke="#3b82f6" strokeWidth={3} dot={{r: 6}} name={t.charts.inrLegend} />
                  <Line type="monotone" dataKey="pi" stroke="#6366f1" strokeWidth={3} dot={{r: 4}} name={t.charts.piLegend} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center space-x-2">
              <Activity className="h-5 w-5 text-rose-500" />
              <span>{t.charts.vitalsTitle}</span>
            </h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                  />
                  <Legend iconType="circle" />
                  <Line type="monotone" dataKey="meanBP" stroke="#be185d" strokeWidth={3} dot={{r: 4}} name={t.charts.meanBPLegend} />
                  <Line type="monotone" dataKey="hr" stroke="#e11d48" strokeWidth={2} dot={{r: 3}} strokeDasharray="5 5" name={t.charts.hrLegend} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100 text-xs text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">{t.table.timestamp}</th>
                <th className="px-6 py-4 text-center">{t.table.speed}</th>
                <th className="px-6 py-4 text-center">{t.table.flow}</th>
                <th className="px-6 py-4 text-center">{t.table.power}</th>
                <th className="px-6 py-4 text-center">{t.table.pi}</th>
                <th className="px-6 py-4 text-center">{t.table.inr}</th>
                <th className="px-6 py-4 text-center">{t.table.ta}</th>
                <th className="px-6 py-4 text-center bg-slate-100/50">{t.table.meanBP}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[...patient.records].reverse().map((r, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">
                    {new Date(r.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-bold text-slate-900">{r.lvad.speed}</td>
                  <td className="px-6 py-4 text-center text-sm font-bold text-slate-900">{r.lvad.flow}</td>
                  <td className="px-6 py-4 text-center text-sm font-bold text-slate-900">{r.lvad.power}</td>
                  <td className="px-6 py-4 text-center text-sm font-bold text-slate-900">{r.lvad.pi}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${r.vitals.inr < 2 ? 'bg-rose-100 text-rose-700' : 'bg-blue-50 text-blue-700'}`}>
                      {r.vitals.inr}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-slate-500">
                    {r.vitals.systolicBP}/{r.vitals.diastolicBP}
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-black text-blue-700 bg-blue-50/30">
                    {r.vitals.meanBP}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAddModal && (
        <AddRecordModal 
          patientName={patient.name}
          onClose={() => setShowAddModal(false)}
          onSubmit={(data) => {
            onAddRecord(patient.id, {
              ...data,
              id: `rec-${Date.now()}`,
              timestamp: new Date().toISOString()
            });
            setShowAddModal(false);
          }}
          t={tAdd}
        />
      )}
    </div>
  );
};

interface AddRecordModalProps {
  patientName: string;
  onClose: () => void;
  onSubmit: (data: Omit<ClinicalRecord, 'id' | 'timestamp'>) => void;
  t: any;
}

const AddRecordModal: React.FC<AddRecordModalProps> = ({ patientName, onClose, onSubmit, t }) => {
  const [formData, setFormData] = useState({
    lvad: { speed: 5500, flow: 4.5, power: 4.0, pi: 4.5 },
    vitals: { inr: 2.5, systolicBP: 110, diastolicBP: 75, meanBP: 87, heartRate: 75, temperature: 36.6 },
    notes: ''
  });

  // Calculate MAP automatically when Systolic or Diastolic changes
  useEffect(() => {
    const map = Math.round((formData.vitals.systolicBP + 2 * formData.vitals.diastolicBP) / 3);
    setFormData(prev => ({
      ...prev,
      vitals: { ...prev.vitals, meanBP: map }
    }));
  }, [formData.vitals.systolicBP, formData.vitals.diastolicBP]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{t.title}</h2>
            <p className="text-sm text-slate-500">{t.subtitle} {patientName}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest border-l-4 border-blue-600 pl-3">{t.lvadStats}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">{t.speed}</label>
                  <input type="number" required className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" value={formData.lvad.speed} onChange={e => setFormData({...formData, lvad: {...formData.lvad, speed: Number(e.target.value)}})} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">{t.flow}</label>
                  <input type="number" step="0.1" required className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" value={formData.lvad.flow} onChange={e => setFormData({...formData, lvad: {...formData.lvad, flow: Number(e.target.value)}})} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">{t.power}</label>
                  <input type="number" step="0.1" required className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" value={formData.lvad.power} onChange={e => setFormData({...formData, lvad: {...formData.lvad, power: Number(e.target.value)}})} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">{t.pi}</label>
                  <input type="number" step="0.1" required className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" value={formData.lvad.pi} onChange={e => setFormData({...formData, lvad: {...formData.lvad, pi: Number(e.target.value)}})} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-widest border-l-4 border-emerald-600 pl-3">{t.vitals}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">{t.inr}</label>
                  <input type="number" step="0.01" required className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none" value={formData.vitals.inr} onChange={e => setFormData({...formData, vitals: {...formData.vitals, inr: Number(e.target.value)}})} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">{t.hr}</label>
                  <input type="number" required className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none" value={formData.vitals.heartRate} onChange={e => setFormData({...formData, vitals: {...formData.vitals, heartRate: Number(e.target.value)}})} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">{t.systolic}</label>
                  <input type="number" required className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none" value={formData.vitals.systolicBP} onChange={e => setFormData({...formData, vitals: {...formData.vitals, systolicBP: Number(e.target.value)}})} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">{t.diastolic}</label>
                  <input type="number" required className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none" value={formData.vitals.diastolicBP} onChange={e => setFormData({...formData, vitals: {...formData.vitals, diastolicBP: Number(e.target.value)}})} />
                </div>
                <div className="space-y-1 col-span-2">
                  <label className="text-xs font-bold text-blue-600 uppercase flex items-center space-x-2">
                    <Activity className="h-3 w-3" />
                    <span>{t.meanBP}</span>
                  </label>
                  <div className="w-full bg-blue-50 border border-blue-200 rounded-lg p-2 font-black text-blue-700 text-lg">
                    {formData.vitals.meanBP} <span className="text-xs font-medium text-blue-400">mmHg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-2 text-slate-500 font-bold hover:text-slate-900 transition-colors"
            >
              {t.cancel}
            </button>
            <button 
              type="submit"
              className="px-10 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95"
            >
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PatientDetails;
