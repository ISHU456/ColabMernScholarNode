import React from 'react';
import { Brain, Target, Clock, ArrowRight, ChevronRight, Zap, Trophy, ShieldCheck, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const QuizHall = ({ quizzes = [], onSelect, isAdmin, onViewAttendees }) => {
  if (quizzes.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-16 text-center border-2 border-dashed border-gray-100 dark:border-gray-800">
        <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-300">
          <Brain size={48} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight mb-2">Neural Link Idle</h3>
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">No active assessments in your sector. Standby for deployment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-indigo-600 rounded-[1.25rem] flex items-center justify-center text-white shadow-xl shadow-indigo-600/30">
            <Zap className="fill-current" size={24} />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white uppercase tracking-tighter leading-none">Active Deployment</h2>
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.4em] mt-2">Institutional Cognitive Protocols</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sector Integrity</span>
              <span className="text-sm font-bold text-emerald-500 uppercase">Verified</span>
           </div>
           <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
              <ShieldCheck size={24} />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {quizzes.map((quiz, index) => (
          <motion.div
            key={quiz._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => !quiz.isAttempted && onSelect(quiz._id)}
            className={`group relative bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer overflow-hidden ${quiz.isAttempted ? 'opacity-70 grayscale' : ''}`}
          >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-600/5 rounded-full group-hover:scale-150 transition-transform duration-1000" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-inner ${quiz.isAttempted ? 'bg-emerald-500/10 text-emerald-500' : 'bg-gray-50 dark:bg-gray-800 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'}`}>
                  {quiz.isAttempted ? <ShieldCheck size={28} /> : <Brain size={28} />}
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{quiz.isAttempted ? 'Earned' : 'Neural Reward'}</span>
                   <span className={`text-lg font-bold tabular-nums ${quiz.isAttempted ? 'text-emerald-500' : 'text-gray-900 dark:text-white'}`}>{quiz.totalPoints} <span className="text-[10px]">COINS</span></span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tighter mb-4 group-hover:text-indigo-600 transition-colors leading-[0.9]">
                {quiz.title}
              </h3>
              
              <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-10 line-clamp-2 leading-relaxed opacity-70">
                {quiz.description || "Core institutional assessment for performance validation."}
              </p>

              {quiz.isAttempted ? (
                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4 mb-8 flex items-center justify-between">
                   <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Sync Complete</span>
                   <div className="flex items-center gap-1">
                      <Star size={12} className="text-amber-500 fill-current" />
                      <Star size={12} className="text-amber-500 fill-current" />
                      <Star size={12} className="text-amber-500 fill-current" />
                   </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-gray-50 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                      <Target size={14} />
                    </div>
                    <div>
                      <p className="text-[8px] font-bold text-gray-400 uppercase">Target</p>
                      <p className="text-xs font-bold text-gray-700 dark:text-gray-300">70%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                      <Clock size={14} />
                    </div>
                    <div>
                      <p className="text-[8px] font-bold text-gray-400 uppercase">Time Protocol</p>
                      <p className="text-xs font-bold text-gray-700 dark:text-gray-300">{quiz.timeLimit} MIN</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => (
                      <div key={i} className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-900 bg-gray-200 overflow-hidden">
                         <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Sch" className="w-full h-full object-cover grayscale" />
                      </div>
                   ))}
                   <div className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-900 bg-indigo-600 flex items-center justify-center text-[8px] font-bold text-white">
                      +12
                   </div>
                </div>

                {isAdmin && (
                   <button 
                     onClick={(e) => {
                       e.stopPropagation();
                       onViewAttendees(quiz._id);
                     }}
                     className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
                   >
                     Attendees
                   </button>
                 )}
                
                <div className="flex items-center gap-3 group/btn">
                  <span className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 ${quiz.isAttempted ? 'text-emerald-600' : 'text-indigo-600'}`}>
                    {quiz.isAttempted ? 'Locked' : 'Enter Arena'}
                  </span>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-black/10 ${quiz.isAttempted ? 'bg-emerald-500 text-white' : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 group-hover:bg-indigo-600 group-hover:text-white'}`}>
                    {quiz.isAttempted ? <ShieldCheck size={24} /> : <ChevronRight size={24} />}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuizHall;
