import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock, CheckCircle2, XCircle, Package } from 'lucide-react';

const OrderHistory = ({ orders = [] }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'delivered': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'processing': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'cancelled': return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
      default: return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle2 size={12} />;
      case 'processing': return <Clock size={12} />;
      case 'cancelled': return <XCircle size={12} />;
      default: return <Package size={12} />;
    }
  };

  return (
    <div className="bg-white dark:bg-white/5 backdrop-blur-3xl rounded-[3rem] p-8 border border-slate-200 dark:border-white/10 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-gray-400 mb-1">Transaction Log</h2>
          <p className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Redemption History</p>
        </div>
        <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500">
          <ShoppingBag size={24} />
        </div>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {orders.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 dark:bg-white/5 rounded-[2rem] border border-dashed border-slate-200 dark:border-white/10">
            <Package size={40} className="mx-auto mb-4 text-slate-300 dark:text-gray-600" />
            <p className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest">No active orders</p>
          </div>
        ) : (
          orders.map((order, idx) => (
            <motion.div 
              key={order._id || idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group p-5 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 hover:border-indigo-500/30 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-white/10">
                    <img 
                      src={order.prizeImage || order.prize?.image} 
                      alt="Prize" 
                      className="w-full h-full object-cover rounded-xl"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-tight line-clamp-1">
                      {order.prizeTitle || order.prize?.title}
                    </h4>
                    <p className="text-[10px] font-semibold text-slate-400 dark:text-gray-500 uppercase tracking-widest">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${getStatusStyle(order.status)}`}>
                  {getStatusIcon(order.status)}
                  {order.status}
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-200/50 dark:border-white/5">
                <span className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest">Credits Debited</span>
                <span className="text-sm font-bold text-indigo-500 tabular-nums">-{order.cost || order.prize?.coinsRequired} SC</span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
