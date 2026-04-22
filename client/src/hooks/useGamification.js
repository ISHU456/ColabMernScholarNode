import { useState, useEffect, useCallback } from 'react';
import { getGamificationState, saveGamificationState, submitQuizAttemptForStudent, markAttendanceForStudent } from '../utils/gamificationStore';

export const useGamification = (studentId) => {
  const [gamification, setGamification] = useState(null);

  const refreshState = useCallback(() => {
    if (studentId) {
      setGamification(getGamificationState(studentId));
    }
  }, [studentId]);

  useEffect(() => {
    refreshState();
    
    const handleUpdate = () => refreshState();
    window.addEventListener('smartlms:gamification_update', handleUpdate);
    return () => window.removeEventListener('smartlms:gamification_update', handleUpdate);
  }, [refreshState]);

  const submitQuizAttempt = useCallback((data) => {
    const result = submitQuizAttemptForStudent({ studentId, ...data });
    if (result.state) {
      setGamification(result.state);
    }
    return result;
  }, [studentId]);

  const markAttendance = useCallback((data) => {
    const result = markAttendanceForStudent({ studentId, ...data });
    if (result.state) {
      setGamification(result.state);
    }
    return result;
  }, [studentId]);

  return { gamification, refreshState, submitQuizAttempt, markAttendance };
};
