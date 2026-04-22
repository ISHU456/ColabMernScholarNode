import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { 
  ShoppingBag, Star, Zap, Trophy, 
  ArrowLeft, CheckCircle2, AlertCircle, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CoinIcon from '../../components/CoinIcon';
import { updateProfile } from '../../features/auth/authSlice';

const RewardStore = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [prizes, setPrizes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRedeeming, setIsRedeeming] = useState(null); // ID of prize being redeemed
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchPrizes = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'https://scholarmatrixdeployment-server.onrender.com'}/api/prizes`, config);
        setPrizes(res.data.sort((a,b) => a.coinsRequired - b.coinsRequired));
      } catch (err) {
        console.error("Failed to fetch prizes", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPrizes();
  }, [user.token]);

  const handleRedeem = async (prize) => {
    if (user.coins < prize.coinsRequired) {
      setMessage({ type: 'error', text: 'Insufficient Scholar Coins' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    setIsRedeeming(prize._id);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post(`${import.meta.env.VITE_API_URL || 'https://scholarmatrixdeployment-server.onrender.com'}/api/orders`, { prizeId: prize._id }, config);
      
      // Update local user coins
      const updatedUser = { ...user, coins: user.coins - prize.coinsRequired };
      dispatch(updateProfile(updatedUser));
      
      setMessage({ type: 'success', text: `Redeemed ${prize.title} successfully!` });
      setTimeout(() => setMessage(null), 5000);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Redemption failed' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setIsRedeeming(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-white p-4 md:p-8 lg:p-12 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="flex items-center gap-4">
             <button 
               onClick={() => navigate('/master-arena')}
               className="p-4 bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
             >
               <ArrowLeft size={24} />
             </button>
             <div>
                <h1 className="text-4xl font-bold uppercase tracking-tight">Reward Registry</h1>
                <p className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-[0.3em]">Convert cognitive effort to tangible value</p>
             </div>
          </div>

          <div className="px-8 py-5 bg-white dark:bg-white/5 backdrop-blur-3xl rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl flex items-center gap-6">
             <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-1">Available Credits</p>
                <div className="flex items-center gap-2 justify-end">
                   <CoinIcon size={24} />
                   <span className="text-3xl font-black tabular-nums">{user.coins || 0}</span>
                </div>
             </div>
          </div>
        </header>

        <AnimatePresence>
          {message && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`mb-8 p-4 rounded-2xl border flex items-center gap-3 ${
                message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-rose-500/10 border-rose-500/20 text-rose-500'
              }`}
            >
              {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
              <span className="text-sm font-bold uppercase tracking-widest">{message.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prizes.length === 0 ? (
             <div className="col-span-full py-20 text-center bg-white dark:bg-white/5 rounded-[3rem] border border-dashed border-slate-200 dark:border-white/10">
                <Trophy size={64} className="mx-auto mb-6 text-slate-200 dark:text-gray-700" />
                <h3 className="text-xl font-bold uppercase mb-2">Registry Offline</h3>
                <p className="text-sm text-slate-400 dark:text-gray-500 uppercase tracking-widest">No prizes currently available for redemption.</p>
             </div>
          ) : (
            prizes.map((prize, idx) => (
              <motion.div 
                key={prize._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white dark:bg-white/5 backdrop-blur-3xl rounded-[3rem] p-8 border border-slate-200 dark:border-white/10 hover:border-indigo-500/30 transition-all flex flex-col h-full shadow-sm hover:shadow-xl"
              >
                <div className="relative aspect-video rounded-[2rem] overflow-hidden mb-6 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10">
                   <img 
                     src={prize.image} 
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                     alt={prize.title}
                     onError={(e) => { e.target.src = 'https://via.placeholder.com/400x225?text=Reward'; }}
                   />
                   <div className="absolute top-4 right-4 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                      <CoinIcon size={14} />
                      <span className="text-xs font-bold text-white tabular-nums">{prize.coinsRequired}</span>
                   </div>
                </div>

                <div className="flex-grow">
                   <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-widest rounded-md border border-indigo-500/20">
                        {prize.category || 'REGISTRY'}
                      </span>
                   </div>
                   <h3 className="text-xl font-bold uppercase tracking-tight mb-2 group-hover:text-indigo-500 transition-colors">{prize.title}</h3>
                   <p className="text-xs font-semibold text-slate-500 dark:text-gray-500 uppercase tracking-widest leading-relaxed line-clamp-3">
                     {prize.description || 'Exclusive institutional reward available for top performing scholars.'}
                   </p>
                </div>

                <button 
                  onClick={() => handleRedeem(prize)}
                  disabled={isRedeeming !== null || user.coins < prize.coinsRequired}
                  className={`mt-8 w-full py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 ${
                    user.coins >= prize.coinsRequired 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 active:scale-95' 
                      : 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-gray-600 cursor-not-allowed'
                  }`}
                >
                  {isRedeeming === prize._id ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      {user.coins >= prize.coinsRequired ? 'Redeem Prize' : 'Insufficient Credits'}
                    </>
                  )}
                </button>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardStore;
