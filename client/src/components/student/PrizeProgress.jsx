import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Trophy, Lock, CheckCircle2 } from 'lucide-react';

const PrizeProgress = ({ coins = 0, prizes = [] }) => {
  // Sort prizes by coins required
  const sortedPrizes = [...prizes].sort((a, b) => a.coinsRequired - b.coinsRequired);
  
  // Find next prize and completed prizes
  const nextPrize = sortedPrizes.find(p => p.coinsRequired > coins) || sortedPrizes[sortedPrizes.length - 1];
  const completedPrizes = sortedPrizes.filter(p => p.coinsRequired <= coins);
  
  // Calculate progress to next prize
  const prevRequired = completedPrizes.length > 0 
    ? completedPrizes[completedPrizes.length - 1].coinsRequired 
    : 0;
  
  const targetRequired = nextPrize ? nextPrize.coinsRequired : 100;
  const progress = Math.min(100, Math.max(0, ((coins - prevRequired) / (targetRequired - prevRequired)) * 100));

  return (
    <div className="bg-white dark:bg-white/5 backdrop-blur-3xl rounded-[3rem] p-8 border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden group h-full">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-50" />
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-gray-400 mb-1">Rewards Journey</h2>
          <p className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Prize Progress</p>
        </div>
        <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500">
          <Gift size={24} />
        </div>
      </div>

      {nextPrize && (
        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-white/10">
                {nextPrize.image ? (
                  <img src={nextPrize.image} alt={nextPrize.title} className="w-full h-full object-cover" />
                ) : (
                  <Trophy size={32} className="text-slate-300" />
                )}
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                <Lock size={12} className="text-white" />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-0.5">Next Unlock</p>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase mb-1">{nextPrize.title}</h3>
              <p className="text-xs font-semibold text-slate-400 dark:text-gray-500 uppercase tracking-widest">
                {nextPrize.coinsRequired - coins} Coins Remaining
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest">Grid Sync</span>
              <span className="text-lg font-bold text-indigo-500 tabular-nums">{Math.round(progress)}%</span>
            </div>
            <div className="h-4 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden p-1 border border-slate-200 dark:border-white/10">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.4)]"
              />
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-2">
            {sortedPrizes.slice(0, 4).map((p, idx) => {
              const isLocked = p.coinsRequired > coins;
              return (
                <div 
                  key={idx}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                    isLocked 
                      ? 'bg-slate-100/50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-300 dark:text-gray-700' 
                      : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                  }`}
                  title={p.title}
                >
                  {isLocked ? <Lock size={14} /> : <CheckCircle2 size={16} />}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!nextPrize && sortedPrizes.length > 0 && (
        <div className="text-center py-8">
           <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy size={40} className="text-emerald-500" />
           </div>
           <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">Maximum Rank Achieved</p>
           <p className="text-xs font-semibold text-slate-400 dark:text-gray-500 uppercase tracking-widest mt-2">All Registry Prizes Unlocked</p>
        </div>
      )}
    </div>
  );
};

export default PrizeProgress;
