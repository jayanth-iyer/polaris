import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Server, Settings, Activity, ShieldCheck, ChevronRight } from 'lucide-react';

const SidebarLink = ({ to, icon: Icon, label, active }) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
    {active && <ChevronRight size={16} className="ml-auto" />}
  </Link>
);

const MainLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6 flex flex-col">
        <div className="flex items-center space-x-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <ShieldCheck className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Polaris
          </h1>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarLink 
            to="/" 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={location.pathname === '/'} 
          />
          <SidebarLink 
            to="/clusters" 
            icon={Server} 
            label="Clusters" 
            active={location.pathname === '/clusters'} 
          />
          <SidebarLink 
            to="/monitoring" 
            icon={Activity} 
            label="Monitoring" 
            active={location.pathname === '/monitoring'} 
          />
          <SidebarLink 
            to="/settings" 
            icon={Settings} 
            label="Settings" 
            active={location.pathname === '/settings'} 
          />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <div className="flex items-center space-x-3 p-2">
            <div className="w-8 h-8 rounded-full bg-slate-700"></div>
            <div>
              <p className="text-sm font-medium text-slate-200">Admin User</p>
              <p className="text-xs text-slate-500">v0.1.0-alpha</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
