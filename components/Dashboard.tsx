
import React from 'react';
import { Patient, Alert } from '../types';
import { 
  Users, 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';

interface DashboardProps {
  patients: Patient[];
  alerts: Alert[];
  onSelectPatient: (id: string) => void;
  t: any;
}

const Dashboard: React.FC<DashboardProps> = ({ patients, alerts, onSelectPatient, t }) => {
  const stats = [
    { label: t.totalPatients, value: patients.length, icon: Users, color: 'bg-blue-500' },
    { label: t.stable, value: patients.filter(p => p.status === 'stable').length, icon: CheckCircle2, color: 'bg-emerald-500' },
    { label: t.critical, value: patients.filter(p => p.status !== 'stable').length, icon: AlertCircle, color: 'bg-rose-500' },
    { label: t.monitoring, value: 24, icon: Activity, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{t.title}</h1>
        <p className="text-slate-500">{t.subtitle}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
            <div className={`p-3 rounded-xl ${stat.color} text-white`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Alerts Section */}
        <div className="lg:col-span-1 flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h2 className="font-bold text-slate-900 flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-rose-500" />
              <span>{t.activeAlerts}</span>
            </h2>
            <span className="bg-rose-100 text-rose-600 px-2.5 py-0.5 rounded-full text-xs font-bold">
              {alerts.length} {t.newAlerts}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[400px]">
            {alerts.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <CheckCircle2 className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>{t.allSystemsNormal}</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {alerts.map(alert => (
                  <div key={alert.id} className="p-4 hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => onSelectPatient(alert.patientId)}>
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-bold text-sm text-slate-900">{alert.patientName}</p>
                      <span className="text-[10px] text-slate-400">{new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${alert.type === 'critical' ? 'bg-rose-500' : 'bg-amber-500'}`}></span>
                      <p className="text-sm text-slate-600 flex-1">{alert.message}</p>
                      <ArrowRight className="h-3 w-3 text-slate-300 group-hover:text-blue-500 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stable Trend Overview */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-slate-900 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <span>{t.distributionTitle}</span>
            </h2>
          </div>
          <div className="space-y-6">
            {patients.map(p => (
              <div key={p.id} className="flex items-center space-x-4 p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer" onClick={() => onSelectPatient(p.id)}>
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500">
                  {p.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-semibold text-slate-900">{p.name}</p>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md ${
                      p.status === 'stable' ? 'bg-emerald-100 text-emerald-600' : 
                      p.status === 'caution' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'
                    }`}>
                      {t.statusLabels[p.status] || p.status}
                    </span>
                  </div>
                  <div className="flex space-x-4 mt-1">
                    <p className="text-xs text-slate-500">{t.flow}: <span className="text-slate-700 font-medium">{p.records[p.records.length-1]?.lvad.flow} L/min</span></p>
                    <p className="text-xs text-slate-500">{t.power}: <span className="text-slate-700 font-medium">{p.records[p.records.length-1]?.lvad.power} W</span></p>
                    <p className="text-xs text-slate-500">{t.inr}: <span className="text-slate-700 font-medium">{p.records[p.records.length-1]?.vitals.inr}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
