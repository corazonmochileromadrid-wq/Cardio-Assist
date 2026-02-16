
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut,
  Activity,
  Heart,
  UserCheck
} from 'lucide-react';

interface SidebarProps {
  activeTab: 'dashboard' | 'patients' | 'doctors' | 'details' | 'settings';
  setActiveTab: (tab: 'dashboard' | 'patients' | 'doctors' | 'details' | 'settings') => void;
  t: any;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, t }) => {
  const menuItems = [
    { id: 'dashboard', label: t.overview, icon: LayoutDashboard },
    { id: 'patients', label: t.patients, icon: Users },
    { id: 'doctors', label: t.doctors, icon: UserCheck },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0">
      <div className="p-6 flex items-center space-x-3 text-white">
        <div className="p-2 bg-blue-600 rounded-lg">
          <Activity className="h-6 w-6" />
        </div>
        <span className="font-bold text-xl tracking-tight">CardioAssist</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <button 
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            activeTab === 'settings' 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
              : 'hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Settings className="h-5 w-5" />
          <span className="font-medium text-sm">{t.settings}</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-900/20 text-red-400 transition-colors">
          <LogOut className="h-5 w-5" />
          <span className="font-medium text-sm">{t.logout}</span>
        </button>
      </div>

      <div className="p-6 bg-slate-800/50 m-4 rounded-xl border border-slate-700">
        <div className="flex items-center space-x-2 text-xs text-blue-400 font-semibold uppercase tracking-wider mb-2">
          <Heart className="h-3 w-3 fill-current" />
          <span>{t.tipTitle}</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          {t.tipContent}
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
