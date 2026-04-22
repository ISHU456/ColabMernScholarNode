import { createSlice } from '@reduxjs/toolkit';

const todayKey = new Date().toISOString().split('T')[0];

const initialState = {
  sessionSeconds: 0,
  todayKey: todayKey,
};

const gamificationSlice = createSlice({
  name: 'gamification',
  initialState,
  reducers: {
    setSessionSeconds: (state, action) => {
      state.sessionSeconds = action.payload;
    },
    incrementSessionSeconds: (state) => {
      if (state.sessionSeconds < 300) {
        state.sessionSeconds += 1;
      }
    },
    resetSessionSeconds: (state) => {
      state.sessionSeconds = 0;
    },
  },
});

export const { setSessionSeconds, incrementSessionSeconds, resetSessionSeconds } = gamificationSlice.actions;
export default gamificationSlice.reducer;
