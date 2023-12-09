import { INumberCodesResponse } from './../../modals/numberCodesModal';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INumberCodes } from "../../modals/numberCodesModal";
import { getNumberCodes } from "../thunk/numberCodesThunk";
import { RootState } from '..';

const initialState: INumberCodes = {
	items: [],
  	loading: false,
  	error: "",
	pagination: {
		totalPage: 0,
		totalCount: 0,
	},
};

const numberCodes = createSlice({
  name: "numberCodes",
  initialState,
  reducers: {
	clearData(state) {
      state.items = [];
    },
	 clearError(state) {
      state.error = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getNumberCodes.pending, (state) => {
			state.loading = true;
        	state.error = "";
      })
      .addCase(
        getNumberCodes.fulfilled,
        (state, action: PayloadAction<INumberCodesResponse>) => {
          state.loading = false;
			 state.items = [...state.items, ...action.payload.items];
			 state.pagination = action.payload.pagination;
        },
      )
      .addCase(getNumberCodes.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message as string;
		  state.items= []
      })
  },
});

export const selectNumberCodesState = (state: RootState) =>
  state.numberCodes;

export const selectNumberCodesPaginationState = (state: RootState) =>
  state.numberCodes.pagination;

export const { clearData, clearError } =
  numberCodes.actions;

export default numberCodes.reducer;
