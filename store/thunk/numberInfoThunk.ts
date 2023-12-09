import { createAsyncThunk } from "@reduxjs/toolkit";
import numberInfoServices from "../../services/numberInfoServices";
import userInfoServices from "../../services/userInfoServices";
import { ICommentRequest, ICommentsRequest } from "../../modals/numberInfoModal";
import { IPaginationRequest } from "../../modals/common";

export const getNumberInfo = createAsyncThunk(
  "numberInfo/getNumberInfo",
  async (number: string, { rejectWithValue }) => {
    try {
      const response = await numberInfoServices.getNumberInfo(number);
		return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const addFavoriteNumber = createAsyncThunk(
  "numberInfo/addFavoriteNumber",
  async (data: {number: string}, { rejectWithValue }) => {
    try {
      const response = await userInfoServices.addFavoriteNumber(data);

		return response.data;
    } catch (error: any) {
		console.log("error", error)
      return rejectWithValue(error.response.data);
    }
  },
);

export const removeFavoriteNumber = createAsyncThunk(
  "numberInfo/removeFavoriteNumber",
  async (data: {number: string}, { rejectWithValue }) => {
    try {
      const response = await userInfoServices.removeFavoriteNumber(data);

		return response.data;
    } catch (error: any) {
		console.log("error", error)
      return rejectWithValue(error.response.data);
    }
  },
);

export const addNumberHistory = createAsyncThunk(
  "numberInfo/addNumberHistory",
  async (number: string, { rejectWithValue }) => {
    try {
		console.log(number)
      const response = await userInfoServices.addNumberHistory(number);
		
		return response.data;
    } catch (error: any) {
		console.log("error", error)
      return rejectWithValue(error.response.data);
    }
  },
);

export const addComment = createAsyncThunk(
  "numberInfo/addComment",
  async (data: ICommentRequest, { rejectWithValue }) => {
    try {
      const response = await numberInfoServices.addComment(data);

		return response.data;
    } catch (error: any) {
		console.log("error", error)
      return rejectWithValue(error.response.data);
    }
  },
);

export const getComments = createAsyncThunk(
  "numberInfo/getComments",
  async (data: ICommentsRequest, { rejectWithValue }) => {
    try {
      const response = await numberInfoServices.getComments(data);

		return response.data;
    } catch (error: any) {
		console.log("error", error)
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteComment = createAsyncThunk(
  "numberInfo/getComment",
  async (data: {id: number} & IPaginationRequest, { rejectWithValue }) => {
    try {
      const response = await numberInfoServices.deleteComment(data);

		return response.data;
    } catch (error: any) {
		console.log("error", error)
      return rejectWithValue(error.response.data);
    }
  },
);