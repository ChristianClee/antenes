import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';


export interface Contro_UI {
  isHideMenu: boolean;
}

const initialState: Contro_UI = {
  // isHideMenu: true, // * repair it later
  isHideMenu: false, // tresting data
}

export const contro_UI = createSlice({
  name: 'Contro_UI',
  initialState,
  reducers: {
    toggleHideMenu(state){
      state.isHideMenu = !state.isHideMenu;
    },
    getHideMenu(state){
      state.isHideMenu = true;
    },
  },
})


export const contro_UI_Actions = contro_UI.actions;
export const  contro_UI_Reducer = contro_UI.reducer;