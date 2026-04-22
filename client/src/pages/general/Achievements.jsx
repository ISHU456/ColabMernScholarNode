import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { 
  Trophy, Flame, Award, Zap, Target, Star, 
  CheckCircle2, Info, ArrowRight, Brain, 
  BookOpen, Calendar, Rocket, Shield, Terminal, 
  Code, Cpu, Laptop, Coins, ChevronRight, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getGamificationState, getLevelFromXp } from '../../utils/gamificationStore';

const Achievements = () => {
  const { user } = useSelector((state) => state.auth);
  const [state, setState] = useState(null);

  useEffect(() => {
    if (user?._id) {
      setState(getGamificationState(user._id));
    }
    
    const handleUpdate = (e) => {
      if (e.detail) setState(e.detail);
    };
    window.addEventListener('scholarmatrix:gamification_update', handleUpdate);
    return () => window.removeEventListener('scholarmatrix:gamification_update', handleUpdate);
  }, [user]);

  const level = getLevelFromXp(state?.xp || 0);
  const currentLevelXp = level * 100;
  const nextLevelXp = (level + 1) * 100;
  const xpInCurrentLevel = (state?.xp || 0) - currentLevelXp;
  const progressToNextLevel = (xpInCurrentLevel / 100) * 100;

  const badgeInventory = [
    {
      id: 'streak_master',
      title: 'Streak Master',
      requirement: '7-day learning streak',
      meaning: 'Exceptional consistency: log in and learn for 7 consecutive days.',
      icon: Flame,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    },
    {
      id: 'quiz_genius',
      title: 'Quiz Genius',
      requirement: '90%+ quiz score',
      meaning: 'Academic excellence: deep understanding of subject matter.',
      icon: Brain,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20'
    },
    {
      id: 'consistent_learner',
      title: 'Consistent Learner',
      requirement: '100% attendance (7 days)',
      meaning: 'Perfect participation: attend all scheduled lectures for a week.',
      icon: CheckCircle2,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-400/20'
    },
    {
      id: 'course_completer',
      title: 'Course Completer',
      requirement: 'Finish all course materials',
      meaning: 'Mastery: complete every lecture, video, and assignment in a subject.',
      icon: Award,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    }
  ];

  const monthlyBadges = [
    {
      id: 'april_pioneer',
      title: 'April Pioneer 2026',
      requirement: 'Active in April',
      meaning: 'Commemorative badge for founding members active during April 2026.',
      icon: Star,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      isEarned: true // Mocked for commemorative
    },
    {
      id: 'level_5_climber',
      title: 'Level 5 Climber',
      requirement: 'Reach Level 5',
      meaning: 'Marks a significant milestone in your learning journey as you progress through the ScholarMatrix ranks.',
      icon: Rocket,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20'
    },
    {
      id: 'weekly_winner',
      title: 'Coding Champion',
      requirement: 'Rank #1 in a weekly contest',
      meaning: 'The ultimate mark of a developer. This legendary badge is given only to those who top the weekly coding leaderboard.',
      icon: Trophy,
      color: 'text-primary-500',
      bgColor: 'bg-primary-500/10',
      borderColor: 'border-primary-500/20'
    },
    {
      id: 'spring_scholar',
      title: 'Spring Scholar',
      requirement: 'Earn 500 XP this month',
      meaning: 'Special seasonal badge for high performers in the spring semester.',
      icon: Sparkles,
      color: 'text-rose-500',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/20',
      isEarned: (state?.xp || 0) >= 500
    }
  ];

  const xpRules = [
    { action: 'Join Live Class', xp: '+10 XP', icon: Calendar, rule: 'Marked upon attendance confirmation' },
    { action: 'Complete Video', xp: '+15 XP', icon: Zap, rule: 'Watch at least 90% of the duration' },
    { action: 'Read Document', xp: '+10 XP', icon: BookOpen, rule: 'Open and scroll through course material' },
    { action: 'Submit Assignment', xp: '+20 XP', icon: Target, rule: 'Upload valid assignment before deadline' },
    { action: 'Pass Quiz', xp: '+30 XP', icon: Brain, rule: 'Score above passing threshold (usually 70%)' }
  ];

  const coinRules = [
    { action: 'High Quiz Score', coins: '1-10 🪙', rule: 'Earn coins based on quiz percentage' },
    { action: 'Weekly Streak', coins: '50 🪙', rule: 'Maintain 7-day streak to get bonus' },
    { action: 'Course Finished', coins: '100 🪙', rule: 'Complete all requirements of a module' }
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] pt-28 pb-32 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- DYNAMIC HEADER --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-[0.2em] mb-6 border border-amber-500/20"
            >
              <Trophy size={14} className="fill-current" />
              <span>Institutional Achievement Ledger</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-semibold text-gray-900 dark:text-white uppercase tracking-tighter italic leading-[0.9]">
              Scholar <span className="text-primary-600 dark:text-primary-500">Momentum</span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mt-8 font-medium max-w-2xl leading-relaxed uppercase tracking-tight">
              Tracking your cognitive evolution and academic milestones. Every interaction is mapped, every achievement is recorded in the ScholarMatrix lattice.
            </p>
          </div>

          <div className="bg-gray-900 dark:bg-white rounded-[3rem] p-10 text-white dark:text-gray-900 shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
               <div className="text-xs font-bold uppercase tracking-[0.3em] opacity-50 mb-4">Neural Credits</div>
               <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-3xl bg-white/10 dark:bg-gray-900/10 flex items-center justify-center text-amber-400">
                    <Coins size={36} className="fill-current" />
                  </div>
                  <div>
                    <div className="text-6xl font-bold tracking-tighter">{user?.coins || 0}</div>
                    <div className="text-xs font-bold uppercase tracking-widest opacity-60">Scholar Coins</div>
                  </div>
               </div>
            </div>
            <div className="absolute top-[-20%] right-[-10%] opacity-10 group-hover:rotate-12 transition-all duration-1000">
              <Sparkles size={240} className="fill-current" />
            </div>
          </div>
        </div>

        {/* --- XP & LEVEL PROGRESS --- */}
        <div className="glass p-10 rounded-[4rem] border border-gray-100 dark:border-gray-800 shadow-xl mb-16 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-center relative z-10">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-primary-600 to-indigo-600 flex items-center justify-center text-white font-bold text-4xl shadow-2xl shadow-primary-500/30">
                {level}
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">Level {level}</h3>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Neural Growth</p>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-tight">{state?.xp || 0} Total XP</h4>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Target</p>
                  <h4 className="text-sm font-bold text-primary-600 uppercase tracking-tight">{nextLevelXp - (state?.xp || 0)} XP Needed</h4>
                </div>
              </div>
              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 p-1">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNextLevel}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary-600 to-indigo-500 rounded-full shadow-[0_0_15px_rgba(67,97,238,0.5)]"
                />
              </div>
            </div>

            <div className="bg-orange-500/5 p-6 rounded-3xl border border-orange-500/10">
               <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
                    <Flame size={20} className="fill-current" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{user?.streak || 0} Days</div>
                    <div className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Active Streak</div>
                  </div>
               </div>
               <div className="h-1.5 bg-orange-500/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, ((user?.streak || 0) / 7) * 100)}%` }}
                    className="h-full bg-orange-500"
                  />
               </div>
               <p className="text-[9px] font-bold text-gray-400 uppercase mt-2 text-right tracking-widest">
                {(user?.streak || 0) >= 7 ? 'Master Achieved' : `${7 - (user?.streak || 0)} days to Master`}
               </p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/5 blur-[120px] rounded-full" />
        </div>

        {/* --- BADGE CATEGORIES --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          
          {/* Institutional Badges */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tighter mb-10 flex items-center gap-4 italic">
              <Award className="text-primary-600" /> Core Academic Badges
            </h2>
            <div className="space-y-6">
              {badgeInventory.map((badge) => {
                const isEarned = (state?.badges || []).includes(badge.id);
                return (
                  <motion.div 
                    key={badge.id}
                    whileHover={{ x: 10 }}
                    className={`flex items-center gap-6 p-6 rounded-[2.5rem] border transition-all ${isEarned ? `bg-white dark:bg-gray-900 ${badge.borderColor} shadow-lg shadow-gray-100 dark:shadow-none` : 'bg-gray-50/50 dark:bg-gray-900/20 border-transparent opacity-50 grayscale'}`}
                  >
                    <div className={`w-16 h-16 rounded-2xl ${badge.bgColor} ${badge.color} flex items-center justify-center shrink-0`}>
                      <badge.icon size={28} className={isEarned ? 'fill-current' : ''} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-1">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-tight truncate">{badge.title}</h3>
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-lg ${isEarned ? 'bg-emerald-500/10 text-emerald-600' : 'bg-gray-200 dark:bg-gray-800 text-gray-400'}`}>
                          {isEarned ? 'Authenticated' : 'Pending'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-2">{badge.meaning}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Logic:</span>
                        <span className="text-[9px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-widest">{badge.requirement}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Monthly / Limited Edition Badges */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tighter mb-10 flex items-center gap-4 italic">
              <Star className="text-amber-500" /> Monthly Milestones
            </h2>
            <div className="space-y-6">
              {monthlyBadges.map((badge) => {
                const isEarned = badge.isEarned;
                return (
                  <motion.div 
                    key={badge.id}
                    whileHover={{ x: 10 }}
                    className={`flex items-center gap-6 p-6 rounded-[2.5rem] border transition-all ${isEarned ? `bg-white dark:bg-gray-900 ${badge.borderColor} shadow-xl shadow-gray-100 dark:shadow-none` : 'bg-gray-50/50 dark:bg-gray-900/20 border-transparent opacity-50 grayscale'}`}
                  >
                    <div className={`w-16 h-16 rounded-2xl ${badge.bgColor} ${badge.color} flex items-center justify-center shrink-0`}>
                      <badge.icon size={28} className={isEarned ? 'fill-current' : ''} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-1">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-tight truncate">{badge.title}</h3>
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-lg ${isEarned ? 'bg-amber-500/10 text-amber-600' : 'bg-gray-200 dark:bg-gray-800 text-gray-400'}`}>
                          {isEarned ? 'Collector Item' : 'Seasonal'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-2">{badge.meaning}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Logic:</span>
                        <span className="text-[9px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-widest">{badge.requirement}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="mt-12 p-8 rounded-[3rem] bg-indigo-600 text-white relative overflow-hidden">
               <div className="relative z-10">
                  <h4 className="text-lg font-bold uppercase tracking-tighter italic mb-4">Coming Soon: Legendaries</h4>
                  <p className="text-xs font-medium text-white/70 leading-relaxed mb-6">We are finalizing the algorithm for "Semester Top Ranker" and "Research Pioneer" badges. Stay tuned.</p>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="w-1/2 h-full bg-white/30"
                    />
                  </div>
               </div>
               <Shield size={120} className="absolute bottom-[-20%] right-[-10%] opacity-10 rotate-12" />
            </div>
          </div>
        </div>

        {/* --- SYSTEM PROTOCOLS (RULES) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          <div className="bg-gray-50 dark:bg-gray-900/40 p-12 rounded-[4rem] border border-gray-100 dark:border-gray-800">
             <h3 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-tighter mb-8 flex items-center gap-3">
               <Zap className="text-amber-500" /> XP Generation Protocol
             </h3>
             <div className="space-y-4">
                {xpRules.map((rule, i) => (
                  <div key={i} className="flex items-center gap-6 p-5 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 shrink-0">
                      <rule.icon size={22} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-tight">{rule.action}</span>
                        <span className="text-sm font-bold text-primary-600">{rule.xp}</span>
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{rule.rule}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/40 p-12 rounded-[4rem] border border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-tighter mb-8 flex items-center gap-3">
                <Coins className="text-amber-500" /> Neural Credits Accrual Rules
              </h3>
             <div className="space-y-4">
                {coinRules.map((rule, i) => (
                  <div key={i} className="flex items-center gap-6 p-5 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 shrink-0">
                      <Coins size={22} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-tight">{rule.action}</span>
                        <span className="text-sm font-bold text-amber-500">{rule.coins}</span>
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{rule.rule}</p>
                    </div>
                  </div>
                ))}
             </div>
             
             <div className="mt-10 p-6 bg-red-500/5 rounded-[2rem] border border-red-500/10">
                <div className="flex gap-4">
                  <Info size={20} className="text-red-500 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2">Penalty Protocol</p>
                    <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 leading-relaxed uppercase">
                      Inactivity for more than 48 hours results in a streak reset. Fraudulent engagement detection will result in immediate Neural Credit voiding.
                    </p>
                  </div>
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Achievements;
