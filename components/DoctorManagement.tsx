
import React, { useState } from 'react';
import { 
  UserPlus, 
  Mail, 
  Trash2, 
  CheckCircle, 
  UserCircle, 
  Search,
  ArrowLeftRight,
  MoreHorizontal,
  ShieldCheck,
  X
} from 'lucide-react';
import { Specialist } from '../types';

interface DoctorManagementProps {
  specialists: Specialist[];
  currentSpecialistId: string;
  onSwitchSpecialist: (id: string) => void;
  onAddSpecialist: (specialist: Specialist) => void;
  onRemoveSpecialist: (id: string) => void;
  t: any;
}

const DoctorManagement: React.FC<DoctorManagementProps> = ({ 
  specialists, 
  currentSpecialistId, 
  onSwitchSpecialist, 
  onAddSpecialist,
  onRemoveSpecialist,
  t 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredSpecialists = specialists.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t.title}</h1>
          <p className="text-slate-500">{t.subtitle}</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-600/20"
        >
          <UserPlus className="h-4 w-4" />
          <span>{t.newDoctor}</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
        <input 
          type="text" 
          placeholder={t.searchPlaceholder}
          className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Doctors Grid/Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{t.table.name}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{t.table.role}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{t.table.license}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{t.table.email}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">{t.table.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSpecialists.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                          {s.initials}
                        </div>
                        {s.id === currentSpecialistId && (
                          <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 border-2 border-white">
                            <CheckCircle className="h-2 w-2 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 flex items-center space-x-2">
                          <span>{s.name}</span>
                          {s.id === currentSpecialistId && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded uppercase tracking-tighter font-bold">
                              {t.currentUser}
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-slate-400">{s.institution}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600 font-medium">{s.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      {s.licenseNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-sm text-slate-500">
                      <Mail className="h-3 w-3" />
                      <span>{s.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {s.id !== currentSpecialistId && (
                        <button 
                          onClick={() => onSwitchSpecialist(s.id)}
                          className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all active:scale-95"
                          title={t.switchProfile}
                        >
                          <ArrowLeftRight className="h-3 w-3" />
                          <span className="hidden sm:inline">{t.switchProfile}</span>
                        </button>
                      )}
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                      {s.id !== currentSpecialistId && (
                        <button 
                          onClick={() => onRemoveSpecialist(s.id)}
                          className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <AddDoctorModal 
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

interface AddDoctorModalProps {
  onClose: () => void;
  onAdd: (data: Omit<Specialist, 'id' | 'initials'>) => void;
  t: any;
}

const AddDoctorModal: React.FC<AddDoctorModalProps> = ({ onClose, onAdd, t }) => {
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
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">{t.newDoctor}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nombre Completo</label>
            <input 
              type="text" 
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all shadow-inner"
              placeholder="Dr/Dra. Nombre Apellido"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cargo / Especialidad</label>
            <input 
              type="text" 
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all shadow-inner"
              placeholder="Ej. Cardiólogo Clínico"
              value={formData.role}
              onChange={e => setFormData({...formData, role: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nº Colegiado</label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all shadow-inner"
                value={formData.licenseNumber}
                onChange={e => setFormData({...formData, licenseNumber: e.target.value})}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Centro Médico</label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all shadow-inner"
                value={formData.institution}
                onChange={e => setFormData({...formData, institution: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Correo Institucional</label>
            <input 
              type="email" 
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all shadow-inner"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="pt-6 flex justify-end space-x-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-2 text-slate-500 font-bold hover:text-slate-900 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-10 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95"
            >
              Confirmar Registro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorManagement;
