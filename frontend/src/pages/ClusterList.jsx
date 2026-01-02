import React from 'react';
import { MoreVertical, ExternalLink, RefreshCw, Trash2, Cpu, HardDrive, Wifi } from 'lucide-react';

const clusters = [
  { id: '1', name: 'prod-kafka-main', status: 'Ready', brokers: 3, version: '3.4.0', provider: 'AWS' },
  { id: '2', name: 'billing-events', status: 'Provisioning', brokers: 3, version: '3.4.0', provider: 'GCP' },
  { id: '3', name: 'user-analytics', status: 'Ready', brokers: 6, version: '3.3.1', provider: 'Local' },
  { id: '4', name: 'logs-collector', status: 'Degraded', brokers: 3, version: '3.4.0', provider: 'Azure' },
];

const StatusBadge = ({ status }) => {
  const styles = {
    'Ready': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Provisioning': 'bg-blue-500/10 text-blue-400 border-blue-500/20 animate-pulse',
    'Degraded': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    'Scaling': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
      {status}
    </span>
  );
};

const ClusterList = () => {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Kafka Clusters</h2>
          <p className="text-slate-400 mt-2">Manage and monitor all your deployed Kafka instances.</p>
        </div>
        <div className="flex space-x-3">
          <button className="p-2 text-slate-400 hover:text-slate-100 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors">
            <RefreshCw size={20} />
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20 active:scale-95">
            <span>Provision Cluster</span>
          </button>
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/50">
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Resources</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Version</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Cloud</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {clusters.map((cluster) => (
              <tr key={cluster.id} className="hover:bg-slate-800/30 transition-colors group">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <Cpu size={16} />
                    </div>
                    <span className="font-semibold text-slate-200">{cluster.name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <StatusBadge status={cluster.status} />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-4 text-xs text-slate-400">
                    <div className="flex items-center space-x-1">
                      <Database size={14} className="text-slate-500" />
                      <span>{cluster.brokers} Brokers</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <HardDrive size={14} className="text-slate-500" />
                      <span>250GB</span>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-mono text-xs text-slate-400">{cluster.version}</td>
                <td className="p-4">
                  <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {cluster.provider}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button title="View Details" className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded">
                      <ExternalLink size={16} />
                    </button>
                    <button title="Delete" className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded">
                      <Trash2 size={16} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-100 rounded">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClusterList;
