import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, UserCheck, AlertCircle, Phone, Mail, Building, Key, Activity, Edit } from 'lucide-react';
import AdminTeacherProfileModal from './AdminTeacherProfileModal';
import AdminStudentProfileModal from './AdminStudentProfileModal';

const AdminPendingTeachers = ({ user }) => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [approvedHistory, setApprovedHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [historyLoading, setHistoryLoading] = useState(true);
    const [error, setError] = useState(null);
    const [authorizing, setAuthorizing] = useState(null);
    const [updatingRole, setUpdatingRole] = useState(null);
    const [selectedTeacherId, setSelectedTeacherId] = useState(null);
    const [selectedStudentId, setSelectedStudentId] = useState(null);

    const fetchPendingUsers = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/admin/pending-authorizations`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setPendingUsers(res.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch pending authorizations.');
        } finally {
            setLoading(false);
        }
    };

    const fetchApprovedHistory = async () => {
        try {
            setHistoryLoading(true);
            const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/admin/approved-history`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setApprovedHistory(res.data);
        } catch (err) {
            console.error("Failed to fetch approval history", err);
        } finally {
            setHistoryLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingUsers();
        fetchApprovedHistory();
    }, [user.token]);

    const handleAuthorize = async (id) => {
        try {
            setAuthorizing(id);
            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/admin/authorizations/${id}/approve`, {}, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            // Remove from list
            setPendingUsers(prev => prev.filter(u => u._id !== id));
            // Refresh history
            fetchApprovedHistory();
        } catch (err) {
            setError(err.response?.data?.message || 'Authorization failed.');
        } finally {
            setAuthorizing(null);
        }
    };

    const handleUpdateRole = async (userId, newRole) => {
        try {
            setUpdatingRole(userId);
            await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/admin/users/${userId}/role`, { role: newRole }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            // Refresh history to show updated role
            fetchApprovedHistory();
        } catch (err) {
            alert("Role update failed: " + (err.response?.data?.message || err.message));
        } finally {
            setUpdatingRole(userId === updatingRole ? null : updatingRole);
        }
    };

    if (loading && historyLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                <p className="text-slate-400 font-medium text-sm animate-pulse uppercase tracking-wide">Scanning Registration Pipeline...</p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {/* --- PENDING QUEUE --- */}
            <div className="space-y-6">
                <div className="bg-white dark:bg-[#080c14] rounded-3xl p-6 md:p-8 flex items-center justify-between shadow-xl border border-slate-200 dark:border-slate-800">
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white uppercase tracking-tighter">System Access Queue</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">Review and verify new faculty and student registration requests before granting system access.</p>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex flex-col items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/30 shadow-inner">
                        <span className="text-xl font-semibold">{pendingUsers.length}</span>
                        <span className="text-xs uppercase tracking-wide font-semibold">Pending</span>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-4 rounded-r-xl flex items-center gap-3">
                        <AlertCircle className="text-red-500" size={20} />
                        <p className="text-sm text-red-700 dark:text-red-400 font-semibold">{error}</p>
                    </div>
                )}

                {pendingUsers.length === 0 ? (
                    <div className="bg-white dark:bg-[#080c14] border border-slate-200 dark:border-slate-800 rounded-3xl p-16 text-center shadow-sm">
                        <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck size={48} className="text-slate-300 dark:text-slate-700" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-tighter mb-2">No Pending Requests</h3>
                        <p className="text-slate-500 dark:text-slate-500 max-w-md mx-auto">The authorization queue is completely clear. All users are currently verified and operational.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {pendingUsers.map(u => (
                                <motion.div 
                                    key={u._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-white dark:bg-[#080c14] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
                                >
                                    <div className={`absolute top-0 left-0 w-full h-1 ${u.role === 'student' ? 'bg-indigo-500' : 'bg-amber-400'}`} />
                                    
                                    <div className="flex justify-between items-start mb-6">
                                        <div 
                                            className="cursor-pointer group/name"
                                            onClick={() => {
                                                if (u.role === 'student') setSelectedStudentId(u._id);
                                                else setSelectedTeacherId(u._id);
                                            }}
                                        >
                                            <h3 className="font-semibold text-lg text-slate-800 dark:text-white capitalize group-hover/name:text-indigo-500 transition-colors flex items-center gap-2">
                                                {u.name} <Edit size={14} className="opacity-0 group-hover/name:opacity-100 transition-opacity" />
                                            </h3>
                                            <p className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full inline-block mt-1 ${u.role === 'student' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'}`}>
                                                Pending {u.role === 'student' ? 'Student' : 'Faculty'} Approval
                                            </p>
                                        </div>
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${u.role === 'student' ? 'bg-indigo-50 border-indigo-100 text-indigo-500' : 'bg-amber-50 border-amber-100 text-amber-500'}`}>
                                            <UserCheck size={24} />
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                            <Building size={16} className="text-indigo-400 shrink-0" />
                                            <div className="min-w-0">
                                                <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">{u.role === 'student' ? 'Roll Number' : 'Employee ID'}</p>
                                                <p className="font-semibold text-sm truncate dark:text-slate-200">{u.rollNumber || u.employeeId || 'Not Provided'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                            <Mail size={16} className="text-indigo-400 shrink-0" />
                                            <div className="min-w-0">
                                                <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">Email Address</p>
                                                <p className="font-semibold text-sm truncate dark:text-slate-200">{u.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleAuthorize(u._id)}
                                        disabled={authorizing === u._id}
                                        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold uppercase tracking-wide shadow-lg transition-all disabled:opacity-50 ${u.role === 'student' ? 'bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 shadow-indigo-500/30' : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-emerald-500/30'} text-white`}
                                    >
                                        {authorizing === u._id ? (
                                            <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Authorizing...</>
                                        ) : (
                                            <><ShieldCheck size={18} /> Approve Access</>
                                        )}
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* --- APPROVAL HISTORY --- */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-4">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white uppercase tracking-tighter flex items-center gap-2">
                        <Activity className="text-indigo-500" size={20} /> Past Approval History
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recently Authorized Identities</p>
                </div>

                <div className="bg-white dark:bg-[#080c14] rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Identity</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Previous Role</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Approval Date</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Access Level Management</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                {historyLoading ? (
                                    [1, 2, 3].map(i => (
                                        <tr key={i} className="animate-pulse">
                                            <td className="px-8 py-6" colSpan="4"><div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-full"></div></td>
                                        </tr>
                                    ))
                                ) : approvedHistory.length > 0 ? approvedHistory.map(u => (
                                    <tr key={u._id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-all duration-300">
                                        <td className="px-8 py-6">
                                            <div 
                                                className="flex items-center gap-3 cursor-pointer group/hist"
                                                onClick={() => {
                                                    if (u.role === 'student') setSelectedStudentId(u._id);
                                                    else setSelectedTeacherId(u._id);
                                                }}
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 font-bold text-xs uppercase group-hover/hist:bg-indigo-500 group-hover/hist:text-white transition-all">
                                                    {u.name[0]}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-800 dark:text-white capitalize group-hover/hist:text-indigo-500 transition-colors flex items-center gap-1.5">
                                                        {u.name} <Edit size={12} className="opacity-0 group-hover/hist:opacity-100 transition-opacity" />
                                                    </p>
                                                    <p className="text-[10px] font-bold text-slate-400 lowercase">{u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${u.role === 'student' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                                            {u.approvedAt 
                                                ? new Date(u.approvedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) 
                                                : new Date(u.updatedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                                            }
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <select 
                                                    value={u.role} 
                                                    onChange={(e) => handleUpdateRole(u._id, e.target.value)}
                                                    disabled={updatingRole === u._id}
                                                    className="bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-xl outline-none border border-transparent focus:border-indigo-500/30 transition-all cursor-pointer disabled:opacity-50"
                                                >
                                                    <option value="student">Student</option>
                                                    <option value="teacher">Teacher</option>
                                                    <option value="hod">HOD</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                                {updatingRole === u._id && <div className="w-4 h-4 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>}
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="px-8 py-20 text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] italic">No approval logs synthesized in current cycle.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {selectedTeacherId && (
                <AdminTeacherProfileModal 
                    teacherId={selectedTeacherId} 
                    user={user} 
                    onClose={() => {
                        setSelectedTeacherId(null);
                        fetchPendingUsers();
                        fetchApprovedHistory();
                    }} 
                />
            )}

            {selectedStudentId && (
                <AdminStudentProfileModal 
                    studentId={selectedStudentId} 
                    user={user} 
                    onClose={() => {
                        setSelectedStudentId(null);
                        fetchPendingUsers();
                        fetchApprovedHistory();
                    }} 
                />
            )}
        </div>
    );
};

export default AdminPendingTeachers;
