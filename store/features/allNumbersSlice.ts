import { getAllNumbers, searchNumber } from './../thunk/allNumbersThunk';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '..';
import { IAllNumbers, INumberRow } from '../../modals/allNumbersModal';

const initialState:IAllNumbers  = {
	items: [],
	pagination: {
		totalPage: 0,
		totalCount: 0,
	},
	loading: false,
	error: "",
	search: {
		items: [],
		loading: false,
		error: "",
	}
};

const allNumbers = createSlice({
  name: "allNumbers",
  initialState,
  reducers: {
	clearNumbersData(state) {
      state.items = [];
    },
	 clearError(state) {
      state.error = "";
    },
	 clearSearchData(state) {
      state.search.items = [];
    },
	 clearSearchError(state) {
      state.search.error = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllNumbers.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        getAllNumbers.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.items = [...state.items, ...action.payload.items];
			 state.pagination = action.payload.pagination;
        },
      )
      .addCase(getAllNumbers.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message as string;
      })
		.addCase(searchNumber.pending, (state) => {
        state.search.loading = true;
        state.search.error = "";
      })
      .addCase(
        searchNumber.fulfilled,
        (state, action: PayloadAction<Array<INumberRow>>) => {
          state.search.loading = false;
          state.search.items = action.payload;
        },
      )
      .addCase(searchNumber.rejected, (state, action: PayloadAction<any>) => {
        state.search.loading = false;
        state.search.error = action.payload.message as string;
      });
  },
});

export const selectAllNumbersState = (state: RootState) =>
  state.allNumbers;

export const selectAllNumbersPaginationState = (state: RootState) =>
  state.allNumbers.pagination;

export const selectSearchNumbersState = (state: RootState) =>
  state.allNumbers.search;

export const { clearNumbersData, clearError, clearSearchData, clearSearchError } =
  allNumbers.actions;

export default allNumbers.reducer;
