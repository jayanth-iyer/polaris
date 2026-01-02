import React from 'react';
import { Server, Activity, Database, AlertCircle, Plus } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-400`}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${trend > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <p className="text-slate-400 text-sm font-medium">{title}</p>
    <h3 className="text-2xl font-bold mt-1 text-slate-100">{value}</h3>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">System Overview</h2>
          <p className="text-slate-400 mt-2">Monitor your Kafka infrastructure and cluster health.</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20 active:scale-95">
          <Plus size={20} />
          <span>New Cluster</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Clusters" value="8" icon={Server} color="blue" />
        <StatCard title="Total Brokers" value="24" icon={Database} color="indigo" trend={12} />
        <StatCard title="Avg Latency" value="1.2ms" icon={Activity} color="emerald" trend={-5} />
        <StatCard title="System Alerts" value="2" icon={AlertCircle} color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-6">Cluster Performance</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[40, 70, 45, 90, 65, 80, 50, 75, 60, 85].map((h, i) => (
              <div key={i} className="flex-1 bg-blue-500/20 rounded-t-lg relative group transition-all hover:bg-blue-500/40" style={{ height: `${h}%` }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {h}% Load
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-slate-500 font-medium">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>23:59</span>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-6">Recent Events</h3>
          <div className="space-y-6">
            {[
              { type: 'success', msg: 'Cluster "prod-kafka" scaled up', time: '2m ago' },
              { type: 'warning', msg: 'High disk usage on broker-3', time: '15m ago' },
              { type: 'info', msg: 'Backup completed for "billing"', time: '1h ago' },
              { type: 'error', msg: 'Failed to deploy "test-cluster"', time: '3h ago' },
            ].map((event, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className={`w-2 h-2 mt-1.5 rounded-full ${event.type === 'success' ? 'bg-emerald-500' :
                    event.type === 'warning' ? 'bg-amber-500' :
                      event.type === 'error' ? 'bg-rose-500' : 'bg-blue-500'
                  }`} />
                <div className="flex-1">
                  <p className="text-sm text-slate-200">{event.msg}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{event.time}</p>
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
