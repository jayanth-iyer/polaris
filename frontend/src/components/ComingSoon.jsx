import React from 'react';
import { Construction, ArrowLeft, Hammer, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ComingSoon = ({ featureName, phase }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] text-center p-6">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
        <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl">
          <div className="flex space-x-4 justify-center mb-6">
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-blue-400 animate-pulse">
              <Hammer size={24} />
            </div>
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Construction size={32} />
            </div>
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-indigo-400 animate-bounce delay-100">
              <Rocket size={24} />
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            {featureName} Under Construction
          </h2>
          <p className="text-slate-400 max-w-md mx-auto mb-8 text-lg">
            We're currently building the {featureName.toLowerCase()} module to provide you with the best experience.
            This feature is scheduled for release in <span className="text-blue-400 font-semibold">{phase}</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 border border-slate-700"
            >
              <ArrowLeft size={18} />
              <span>Back to Dashboard</span>
            </button>
            <button
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-blue-500/20"
              disabled
            >
              Notify Me
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-8 text-slate-500 text-sm font-medium uppercase tracking-widest">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>Designing</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
          <span className="text-blue-400">Developing</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-slate-700 rounded-full"></div>
          <span>Testing</span>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
