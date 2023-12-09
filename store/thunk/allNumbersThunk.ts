import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAllNumbersRequest } from "../../modals/allNumbersModal";
import allNumbersServices from "../../services/allNumbersServices";

export const getAllNumbers = createAsyncThunk(
  "allNumbers/getAllNumbers",
  async (data: IAllNumbersRequest, { rejectWithValue }) => {
    try {
      const response = await allNumbersServices.getAllNumbers(data);
		return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const searchNumber = createAsyncThunk(
  "allNumbers/searchNumber",
  async (number: string, { rejectWithValue }) => {
    try {
      const response = await allNumbersServices.searchNumber(number);
		return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);