import React from 'react';
import { Award, Star, Zap } from 'lucide-react';

const MonthlyHonors = ({ stats = {} }) => {
  const honors = [
    { id: 1, label: 'Highest Accuracy', value: '98%', icon: Star, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { id: 2, label: 'Speed Demon', value: '1.2m', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 3, label: 'Eternal Streak', value: '14d', icon: Award, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-tight mb-8">Monthly Honors</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {honors.map((h) => (
          <div key={h.id} className="group flex flex-col items-center text-center p-6 rounded-3xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-default">
            <div className={`w-14 h-14 ${h.bg} ${h.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <h.icon size={28} />
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{h.label}</span>
            <span className="text-2xl font-black text-gray-900 dark:text-white tabular-nums">{h.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyHonors;
