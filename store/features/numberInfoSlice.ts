import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '..';
import { ICommentState, INumber, INumberInfo } from '../../modals/numberInfoModal';
import { addComment, addFavoriteNumber, addNumberHistory, deleteComment, getComments, getNumberInfo, removeFavoriteNumber } from '../thunk/numberInfoThunk';
import { TypeDangerous } from '../../modals/allNumbersModal';

const initialState: INumberInfo  = {
	info: {
		data: {
			number: "+380 123 456 789",
			level_dangerous: 0,
			count_marks: 0,
			last_date_mark: "Не оціненно",
			isFavoriteNum: false,
			typeDangerous: TypeDangerous.Safe,
		},
		loading: false,
		error: ""
	},
	comments: {
		items: [],
		pagination: {
			totalPage: 0,
			totalCount: 0,
		},
		loading: false,
		error: "",
		filterSettings: {
        safeCount: 0,
        dangerousCount: 0,
        neutralCount: 0,
      },
	},
};

const numberInfo = createSlice({
  name: "numberInfo",
  initialState,
  reducers: {
	 clearError(state) {
      state.info.error = "";
    },
	 clearData(state) {
      state.info.data = initialState.info.data;
    },
	 clearDataComments(state) {
      state.comments.items = initialState.comments.items;
    },
	 clearErrorComments(state) {
      state.comments.error = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getNumberInfo.pending, (state) => {
        state.info.loading = true;
        state.info.error = "";
      })
      .addCase(
        getNumberInfo.fulfilled,
        (state, action: PayloadAction<INumber>) => {
			if(action.payload.number) {
				state.info.data = action.payload;
			} else {
				state.info.data = initialState.info.data;
			}
			state.info.loading = false;
        },
      )
      .addCase(getNumberInfo.rejected, (state, action: PayloadAction<any>) => {
        state.info.loading = false;
        state.info.error = action.payload.message as string;
      })
		.addCase(addFavoriteNumber.pending, (state) => {
        state.info.error = "";
      })
      .addCase(
        addFavoriteNumber.fulfilled,
        (state, action: PayloadAction<{isFavoriteNum: boolean}>) => {
			state.info.data = {...state.info.data, isFavoriteNum: action.payload.isFavoriteNum}
        },
      )
      .addCase(addFavoriteNumber.rejected, (state, action: PayloadAction<any>) => {
        state.info.error = action.payload.message as string;
      })
		.addCase(removeFavoriteNumber.pending, (state) => {
        state.info.error = "";
      })
      .addCase(
        removeFavoriteNumber.fulfilled,
        (state, action: PayloadAction<{isFavoriteNum: boolean}>) => {
			state.info.data = {...state.info.data, isFavoriteNum: action.payload.isFavoriteNum}
        },
      )
      .addCase(removeFavoriteNumber.rejected, (state, action: PayloadAction<any>) => {
        state.info.error = action.payload.message as string;
      })
		.addCase(addNumberHistory.pending, (state) => {
        state.info.error = "";
      })
      .addCase(addNumberHistory.rejected, (state, action: PayloadAction<any>) => {
        state.info.error = action.payload.message as string;
      })
		.addCase(addComment.pending, (state) => {
        state.comments.error = "";
        state.comments.loading = true;
      })
		.addCase(addComment.fulfilled, (state, action: PayloadAction<any>) => {
			state.comments.items = action.payload.items;
			state.comments.pagination = action.payload.pagination;

			state.info.data.level_dangerous = action.payload.dangerLevel;
			state.info.data.typeDangerous = action.payload.typeDangerous;
			state.comments.filterSettings = action.payload.filterSettings;

			state.comments.loading = false;
        },
      )
		.addCase(addComment.rejected, (state, action: PayloadAction<any>) => {
        state.comments.error = action.payload.message as string;
		   state.comments.loading = false;
      })
		.addCase(deleteComment.pending, (state) => {
        state.comments.error = "";
        state.comments.loading = true;
      })
		.addCase(deleteComment.fulfilled, (state, action: PayloadAction<any>) => {
			state.comments.items = action.payload.items;
			state.comments.pagination = action.payload.pagination;
		
			state.info.data.level_dangerous = action.payload.dangerLevel;
			state.info.data.typeDangerous = action.payload.typeDangerous;
			state.comments.filterSettings = action.payload.filterSettings;

			state.comments.loading = false;
        },
      )
		.addCase(getComments.pending, (state) => {
        state.comments.loading = true;
        state.comments.error = "";
      })
      .addCase(
        getComments.fulfilled,
        (state, action: PayloadAction<ICommentState>) => {
			 state.comments.items = [...state.comments.items, ...action.payload.items];
			state.comments.pagination = action.payload.pagination;
			state.comments.filterSettings = action.payload.filterSettings;
			state.comments.loading = false;
        },
      )
      .addCase(getComments.rejected, (state, action: PayloadAction<any>) => {
        state.comments.loading = false;
        state.comments.error = action.payload.message as string;
      })
  },
});

export const selectNumberInfoState = (state: RootState) =>
  state.numberInfo.info;

export const selectCommentsState = (state: RootState) =>
  state.numberInfo.comments;

export const selectCommentsPaginationState = (state: RootState) =>
  state.numberInfo.comments.pagination;

export const { clearError, clearData, clearDataComments, clearErrorComments } =
  numberInfo.actions;

export default numberInfo.reducer;
