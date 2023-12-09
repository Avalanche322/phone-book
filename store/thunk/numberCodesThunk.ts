import { INumberCodesRequest } from './../../modals/numberCodesModal';
import { createAsyncThunk } from "@reduxjs/toolkit";
import numberCodesServices from "../../services/numberCodesServices";

export const getNumberCodes = createAsyncThunk(
  "numberCodes/getNumberCodes",
  async (data: INumberCodesRequest, { rejectWithValue }) => {
    try {
      const response = await numberCodesServices.getNumberCodes(data);
		return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);