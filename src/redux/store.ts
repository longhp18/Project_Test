import { configureStore } from "@reduxjs/toolkit";

import { dataReducer_ } from "./filterSlice";

const store: any = configureStore({
  reducer: {
    rootReducer: dataReducer_,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export default store;
