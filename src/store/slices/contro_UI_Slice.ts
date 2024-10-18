import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';


export interface Contro_UI {
  isHideMenu: boolean;
  numbOption: number | null;
  numbSubOption: number | null;
}

const initialState: Contro_UI = {
  // isHideMenu: true, // * repair it later
  isHideMenu: false, // tresting data
  numbOption: null,
  numbSubOption: null,
}

export const contro_UI = createSlice({
  name: 'Contro_UI',
  initialState,
  reducers: {
    toggleHideMenu(state){
      state.isHideMenu = !state.isHideMenu;
    },
    setHideMenu(state){
      state.isHideMenu = true;
    },
    setNumbOption(state, actions:PayloadAction<number | null>){
      state.numbOption = actions.payload
    },
    setNumbSubOption(state, actions:PayloadAction<number | null>){
      state.numbSubOption = actions.payload
    }

  },
})


export const contro_UI_Actions = contro_UI.actions;
export const  contro_UI_Reducer = contro_UI.reducer;