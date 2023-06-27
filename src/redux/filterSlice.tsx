import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  dataApi: "",
};

const dataReducer = createSlice({
  name: "dataReducer",
  initialState,
  reducers: {
    getDataApi: (state: RootState, action: PayloadAction<any>) => {
      state.dataApi = action.payload;
    },
  },
});

export const { getDataApi } = dataReducer.actions;

export const dataReducer_ = dataReducer.reducer;
