import React from 'react';
import { Trophy, Medal, Crown } from 'lucide-react';
import CoinIcon from '../CoinIcon';

const Leaderboard = ({ data = [] }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">Global Leaderboard</h2>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1">Institutional Rankings</p>
        </div>
        <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
          <Trophy size={24} />
        </div>
      </div>

      <div className="space-y-4">
        {data.slice(0, 5).map((user, index) => (
          <div key={user._id} className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${index === 0 ? 'bg-amber-500/5 border border-amber-500/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              {index === 0 ? <Crown className="text-amber-500" size={24} /> : 
               index === 1 ? <Medal className="text-slate-400" size={24} /> :
               index === 2 ? <Medal className="text-amber-700" size={24} /> :
               <span className="text-lg font-bold text-gray-300">#{index + 1}</span>}
            </div>
            
            <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm shrink-0">
              {user.profilePic ? (
                <img src={user.profilePic} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase truncate">{user.name}</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{user.department}</p>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1.5 justify-end">
                <CoinIcon size={14} />
                <span className="text-sm font-black text-gray-900 dark:text-white tabular-nums">{user.coins || 0}</span>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Scholarly Balance</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-8 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-xs font-bold uppercase tracking-widest rounded-2xl transition-all">
        View Full Registry
      </button>
    </div>
  );
};

export default Leaderboard;
