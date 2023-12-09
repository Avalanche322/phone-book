import { createAsyncThunk } from "@reduxjs/toolkit";
import statisticsDangerousServices from "../../services/statisticsDangerousServices";

export const getStatisticsLevelDangerous = createAsyncThunk(
  "statisticsDangerous/getStatisticsLevelDangerous",
  async (_, { rejectWithValue }) => {
    try {
      const response = await statisticsDangerousServices.getStatisticsLevelDangerous();

		return response.data;
    } catch (error: any) {
		console.log("error", error)
      return rejectWithValue(error.response.data);
    }
  },
);