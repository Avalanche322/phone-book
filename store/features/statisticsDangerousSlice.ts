import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '..';
import { getStatisticsLevelDangerous } from '../thunk/statisticsDangerousThunk';
import { IStats } from "../../modals/staticsDangerousModal";

const initialState: IStats  = {
	stats: {
		dangerous: 1,
		neutral: 1,
		safe: 1,
	},
	loading: false,
	error: ""
};

const statisticsDangerous = createSlice({
  name: "statisticsDangerous",
  initialState,
  reducers: {
	clearData(state) {
      state.stats = initialState.stats;
    },
	 clearError(state) {
      state.error = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getStatisticsLevelDangerous.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        getStatisticsLevelDangerous.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
			 state.stats = action.payload;
        },
      )
      .addCase(getStatisticsLevelDangerous.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message as string;
      });
  },
});

export const selectStatisticsDangerousState = (state: RootState) =>
  state.statisticsDangerous;

export const { clearData, clearError } =
  statisticsDangerous.actions;

export default statisticsDangerous.reducer;
