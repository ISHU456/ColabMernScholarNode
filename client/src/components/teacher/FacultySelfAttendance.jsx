import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { 
  Calendar, ChevronLeft, ChevronRight, Clock, ShieldCheck, FileText, Loader2, AlertCircle, XCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FacultySelfAttendance = ({ user }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    const fetchAttendance = async () => {
      setIsLoading(true);
      try {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1; // 1-indexed

        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const res = await axios.get(`${window.API_URL}/api/attendance/daily/monthly?studentId=${user._id}&month=${month}&year=${year}`, config);
        
        setAttendanceRecords(res.data);
      } catch (error) {
        console.error('Error fetching personal attendance:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAttendance();
  }, [selectedDate, user._id, user.token]);

  const daysInMonth = useMemo(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysCount = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    
    const days = [];
    // padding for previous month
    for (let i = 0; i < firstDayIndex; i++) {
        days.push(null);
    }
    // actual days
    for (let i = 1; i <= daysCount; i++) {
        days.push(i);
    }
    return days;
  }, [selectedDate]);

  const attendanceMap = useMemo(() => {
    const map = {};
    attendanceRecords.forEach(record => {
        const d = new Date(record.date);
        const day = d.getDate();
        map[day] = record;
    });
    return map;
  }, [attendanceRecords]);

  const stats = useMemo(() => {
    let present = 0;
    let incomplete = 0;
    attendanceRecords.forEach(r => {
        if (r.status === 'present') present++;
        if (r.status === 'incomplete') incomplete++;
    });
    return { present, incomplete, total: attendanceRecords.length };
  }, [attendanceRecords]);

  const getStatusBadge = (status) => {
    if (status === 'present') return <div className="mt-2 w-full py-1 rounded-md bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1"><ShieldCheck size={10}/> Present</div>;
    if (status === 'incomplete') return <div className="mt-2 w-full py-1 rounded-md bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1"><Clock size={10}/> Incomplete</div>;
    return <div className="mt-2 w-full py-1 rounded-md bg-rose-500 text-white text-[10px] font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1"><XCircle size={10}/> Absent</div>;
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="bg-white dark:bg-gray-900 p-6 lg:p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
           <h2 className="text-xl font-semibold text-gray-900 dark:text-white uppercase tracking-tighter flex items-center gap-3">
             <Calendar className="text-indigo-600" />
             My Attendance History
           </h2>
           <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mt-1">
             Face & Location Verified Daily Logs
           </p>
        </div>

        <div className="flex items-center justify-between md:justify-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-1.5 border border-gray-200 dark:border-gray-700 shadow-sm w-full md:w-auto">
          <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))} className="p-3 hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all text-gray-500 dark:text-gray-300 active:scale-95"><ChevronLeft size={18}/></button>
          <div className="px-6 text-sm font-bold uppercase tracking-widest min-w-[150px] text-center text-gray-900 dark:text-white">
             {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </div>
          <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))} className="p-3 hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all text-gray-500 dark:text-gray-300 active:scale-95"><ChevronRight size={18}/></button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 flex items-center justify-center">
               <ShieldCheck size={24} />
            </div>
            <div>
               <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Verified Present</p>
               <h3 className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums tracking-tighter">{stats.present} <span className="text-sm text-gray-400">days</span></h3>
            </div>
         </div>
         <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-500 flex items-center justify-center">
               <Clock size={24} />
            </div>
            <div>
               <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Incomplete (Missed Exit)</p>
               <h3 className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums tracking-tighter">{stats.incomplete} <span className="text-sm text-gray-400">days</span></h3>
            </div>
         </div>
         <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 flex items-center justify-center">
               <FileText size={24} />
            </div>
            <div>
               <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Total Logged Days</p>
               <h3 className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums tracking-tighter">{stats.total} <span className="text-sm text-gray-400">days</span></h3>
            </div>
         </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 p-6 relative min-h-[400px]">
         {isLoading && (
            <div className="absolute inset-0 z-10 bg-white/60 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center rounded-[2.5rem]">
               <Loader2 size={40} className="text-indigo-600 animate-spin"/>
            </div>
         )}
         
         <div className="grid grid-cols-7 gap-2 lg:gap-4 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
               <div key={day} className="text-center text-xs font-bold uppercase tracking-wider text-gray-400 py-2">
                  {day}
               </div>
            ))}
         </div>

         <div className="grid grid-cols-7 gap-2 lg:gap-4">
            {daysInMonth.map((day, idx) => {
               if (day === null) return <div key={`empty-${idx}`} className="h-24 lg:h-32 rounded-2xl bg-gray-50/50 dark:bg-gray-800/20" />;
               
               const record = attendanceMap[day];
               const isToday = day === new Date().getDate() && selectedDate.getMonth() === new Date().getMonth() && selectedDate.getFullYear() === new Date().getFullYear();

               return (
                  <div key={day} className={`h-24 lg:h-32 rounded-2xl p-2 lg:p-3 border flex flex-col transition-all group hover:shadow-md ${isToday ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900'}`}>
                     <div className="flex items-start justify-between">
                        <span className={`text-sm lg:text-base font-bold ${isToday ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-white'}`}>
                           {day}
                        </span>
                     </div>
                     
                     <div className="mt-auto">
                        {record ? getStatusBadge(record.status) : (
                           day <= new Date().getDate() || selectedDate.getMonth() < new Date().getMonth() || selectedDate.getFullYear() < new Date().getFullYear() ? (
                              <div className="mt-2 w-full py-1 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-400 text-[10px] font-bold uppercase tracking-wider text-center italic border border-gray-100 dark:border-gray-700">
                                 No Log
                              </div>
                           ) : null
                        )}
                     </div>

                     {record && (
                        <div className="absolute opacity-0 group-hover:opacity-100 pointer-events-none mt-2 lg:mt-0 z-20 transition-opacity bg-slate-900 text-white text-[10px] p-2 rounded-xl shadow-xl border border-slate-700 min-w-[120px]">
                           <p className="font-bold uppercase mb-1 border-b border-slate-700 pb-1">Timestamps</p>
                           <p className="flex justify-between"><span>IN:</span> <span className="font-mono">{record.entry?.time ? new Date(record.entry.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '--:--'}</span></p>
                           <p className="flex justify-between"><span>OUT:</span> <span className="font-mono">{record.exit?.time ? new Date(record.exit.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '--:--'}</span></p>
                        </div>
                     )}
                  </div>
               );
            })}
         </div>
      </div>
    </div>
  );
};

export default FacultySelfAttendance;
