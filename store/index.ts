import { configureStore } from "@reduxjs/toolkit";
import allNumbersSlice from "./features/allNumbersSlice";
import numberCodesSlice from "./features/numberCodesSlice";
import numberInfoSlice from "./features/numberInfoSlice";
import userInfoSlice from "./features/userInfoSlice";
import statisticsDangerousSlice from "./features/statisticsDangerousSlice";

export const store = configureStore({
  reducer: {
    numberCodes: numberCodesSlice,
    allNumbers: allNumbersSlice,
	 numberInfo: numberInfoSlice,
	 userInfo: userInfoSlice,
	 statisticsDangerous: statisticsDangerousSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
