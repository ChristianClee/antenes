import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';


export interface CounterState {
  value: number;
  colorTheme: string | null;
}

const initialState: CounterState = {
  value: 0,
  colorTheme: localStorage.getItem('theme'),
}

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setDarkTheme: (state) => {
      const darkTheme = 'dark-theme';
      localStorage.setItem('theme', darkTheme);
      state.colorTheme = localStorage.getItem('theme');
    },
    setWhiteTheme: (state) => {
      localStorage.removeItem('theme');
      state.colorTheme = localStorage.getItem('theme');
    },
    setColorThemeInLocalStore: (state) => {
      function setWhiteTheme(){
        localStorage.removeItem('theme');
        state.colorTheme = localStorage.getItem('theme');
      };
      function setDarkTheme(){
        const darkTheme = 'dark-theme';
        localStorage.setItem('theme', darkTheme);
        state.colorTheme = localStorage.getItem('theme');
      };
      const isDarkTheme = state.colorTheme? true : false;
      if(isDarkTheme){
        setWhiteTheme();
      }else{
        setDarkTheme();
      }
    },
  },
})


export const testActions = testSlice.actions;
export const testReducer = testSlice.reducer;