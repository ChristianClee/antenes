import { configureStore } from '@reduxjs/toolkit';
import { testReducer } from './slices/testSlice';
import { contro_UI_Reducer } from './slices/contro_UI_Slice';

export const store = configureStore({
  reducer: {
    test: testReducer,
    contro_UI: contro_UI_Reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
