import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '..';
import { ICommentHistory, IFavoriteHistoryNumber, IUser } from '../../modals/userInfoModal';
import { clearHistory, getFavoriteNumbers, getHistory, getMyComments, getUserInfo, login, register, removeFavoriteNumber } from '../thunk/userInfoThunk';
import { Pagination } from "../../modals/numberCodesModal";

interface IUserInfo {
	user: IUser
	favoriteNumbers: {
		items: Array<IFavoriteHistoryNumber>;
		loading: boolean;
		error: string;
		pagination: Pagination,
	},
	history: {
		items: Array<IFavoriteHistoryNumber>;
		loading: boolean;
		error: string;
		pagination: Pagination,
	},
	comments: {
		items: Array<ICommentHistory>;
		loading: boolean;
		error: string;
		pagination: Pagination,
	}
}

const initialState: IUserInfo  = {
	user: {
		email: "",
		username: "",
		loading: false,
		error: "",
	},
	favoriteNumbers: {
		items: [],
		pagination: {
			totalPage: 0,
			totalCount: 0,
		},
		loading: false,
		error: "",
	},
	history: {
		items: [],
		pagination: {
			totalPage: 0,
			totalCount: 0,
		},
		loading: false,
		error: "",
	},
	comments: {
		items: [],
		pagination: {
			totalPage: 0,
			totalCount: 0,
		},
		loading: false,
		error: ""
	}
};

const userInfo = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
	clearErrorUser(state) {
      state.user.error = "";
    },
	 clearDataUser(state) {
      state.user.username = "";
      state.user.email = "";
    },
	 clearErrorFavorites(state) {
      state.favoriteNumbers.error = "";
    },
	 clearDataFavorites(state) {
      state.favoriteNumbers.items = [];
    },
	 clearErrorHistory(state) {
      state.history.error = "";
    },
	 clearDataHistory(state) {
      state.history.items = [];
    },
	 clearErrorMyComments(state) {
      state.comments.error = "";
    },
	 clearDataMyComments(state) {
      state.comments.items = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.user.loading = true;
        state.user.error = "";
      })
      .addCase(
        getUserInfo.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.user.loading = false;
			 state.user.email = action.payload.email;
			 state.user.username = action.payload.username;
        },
      )
      .addCase(getUserInfo.rejected, (state, action: PayloadAction<any>) => {
        state.user.loading = false;
        state.user.error = action.payload.message as string;
      })
		.addCase(login.pending, (state) => {
        state.user.loading = true;
        state.user.error = "";
      })
      .addCase( login.fulfilled,(state) => {
         state.user.loading = false;
        },
      )
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.user.loading = false;
        state.user.error = action.payload.message as string;
      })
		.addCase(register.pending, (state) => {
        state.user.loading = true;
        state.user.error = "";
      })
      .addCase(register.fulfilled, (state) => {
          state.user.loading = false;
        },
      )
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.user.loading = false;
        state.user.error = action.payload.message as string;
      })
		.addCase(getFavoriteNumbers.pending, (state) => {
        state.favoriteNumbers.loading = true;
        state.favoriteNumbers.error = "";
      })
      .addCase(
        getFavoriteNumbers.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.favoriteNumbers.loading = false;
			 state.favoriteNumbers.items = [...state.favoriteNumbers.items, ...action.payload.items];
			 state.favoriteNumbers.pagination = action.payload.pagination;
        },
      )
      .addCase(getFavoriteNumbers.rejected, (state, action: PayloadAction<any>) => {
        state.favoriteNumbers.loading = false;
        state.favoriteNumbers.error = action.payload.message as string;
      })
		.addCase(removeFavoriteNumber.pending, (state) => {
        state.favoriteNumbers.loading = true;
        state.favoriteNumbers.error = "";
      })
      .addCase(
        removeFavoriteNumber.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.favoriteNumbers.loading = false;
			 state.favoriteNumbers.items = action.payload.items;
			 state.favoriteNumbers.pagination = action.payload.pagination;
        },
      )
      .addCase(removeFavoriteNumber.rejected, (state, action: PayloadAction<any>) => {
        state.favoriteNumbers.loading = false;
        state.favoriteNumbers.error = action.payload.message as string;
      })
		.addCase(getHistory.pending, (state) => {
        state.history.loading = true;
        state.history.error = "";
      })
      .addCase(
        getHistory.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.history.loading = false;
			 state.history.items = [...state.history.items, ...action.payload.items];
			 state.history.pagination = action.payload.pagination;
        },
      )
      .addCase(getHistory.rejected, (state, action: PayloadAction<any>) => {
        state.history.loading = false;
        state.history.error = action.payload.message as string;
      })
		.addCase(clearHistory.pending, (state) => {
        state.history.loading = true;
        state.history.error = "";
      })
      .addCase(
        clearHistory.fulfilled,
        (state) => {
          state.history.loading = false;
			 state.history.items = [];
			 state.history.pagination = initialState.history.pagination;
        },
      )
      .addCase(clearHistory.rejected, (state, action: PayloadAction<any>) => {
        state.history.loading = false;
        state.history.error = action.payload.message as string;
      })
		.addCase(getMyComments.pending, (state) => {
        state.comments.loading = true;
        state.comments.error = "";
      })
      .addCase(
        getMyComments.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.comments.loading = false;
			 state.comments.items = [...state.comments.items, ...action.payload.items];
			 state.comments.pagination = action.payload.pagination;
        },
      )
      .addCase(getMyComments.rejected, (state, action: PayloadAction<any>) => {
        state.comments.loading = false;
        state.comments.error = action.payload.message as string;
      })
  },
});

export const { 
	clearErrorUser, 
	clearDataUser, 
	clearDataFavorites, 
	clearErrorFavorites, 
	clearDataHistory, 
	clearErrorHistory,
	clearDataMyComments,
	clearErrorMyComments,

} = userInfo.actions;

export const selectUserInfoState = (state: RootState) =>
  state.userInfo.user;

export const selectFavoriteNumbersState = (state: RootState) =>
  state.userInfo.favoriteNumbers;

export const selectFavoriteNumbersPaginationState = (state: RootState) =>
  state.userInfo.favoriteNumbers.pagination;

export const selectHistoryState = (state: RootState) =>
  state.userInfo.history;

export const selectHistoryPaginationState = (state: RootState) =>
  state.userInfo.history.pagination;


export const selectMyCommentsState = (state: RootState) =>
  state.userInfo.comments;

export const selectMyCommentsPaginationState = (state: RootState) =>
  state.userInfo.comments.pagination;


export default userInfo.reducer;
