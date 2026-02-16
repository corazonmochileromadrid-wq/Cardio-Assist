
import React from 'react';
import { Patient } from '../types';
import { 
  MoreVertical, 
  ExternalLink, 
  UserPlus, 
  Calendar,
  Filter
} from 'lucide-react';

interface PatientListProps {
  patients: Patient[];
  onSelectPatient: (id: string) => void;
  t: any;
}

const PatientList: React.FC<PatientListProps> = ({ patients, onSelectPatient, t }) => {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t.title}</h1>
          <p className="text-slate-500">{t.subtitle}</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-600/20">
          <UserPlus className="h-4 w-4" />
          <span>{t.newPatient}</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
          <span className="text-sm text-slate-500 font-medium">{patients.length} {t.totalEntries}</span>
          <button className="flex items-center space-x-2 text-slate-600 text-sm hover:text-slate-900 px-3 py-1 rounded-md hover:bg-white transition-all">
            <Filter className="h-4 w-4" />
            <span>{t.filter}</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{t.table.name}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{t.table.surgery}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{t.table.flow}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{t.table.inr}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{t.table.status}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {patients.map((p) => {
                const latest = p.records[p.records.length - 1];
                return (
                  <tr 
                    key={p.id} 
                    className="hover:bg-slate-50 transition-colors group cursor-pointer"
                    onClick={() => onSelectPatient(p.id)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                          {p.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{p.name}</p>
                          <p className="text-xs text-slate-400">ID: {p.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-slate-300" />
                        <span>{new Date(p.surgeryDate).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${latest?.lvad.flow < 3 ? 'text-rose-600 font-bold' : 'text-slate-700'}`}>
                        {latest?.lvad.flow || '--'} L/min
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${latest?.vitals.inr < 2 ? 'text-amber-600 font-bold' : 'text-slate-700'}`}>
                        {latest?.vitals.inr || '--'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        p.status === 'stable' ? 'bg-emerald-100 text-emerald-800' :
                        p.status === 'caution' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                          <ExternalLink className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientList;
