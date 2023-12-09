import { createAsyncThunk } from "@reduxjs/toolkit";
import userInfoServices from "../../services/userInfoServices";
import { ILogin, IRegister } from "../../modals/userInfoModal";
import { storeToken } from "../../services/storage";
import { IPaginationRequest } from "../../modals/common";

export const getUserInfo = createAsyncThunk(
  "userInfo/getUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userInfoServices.getUserInfo();
		return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const login = createAsyncThunk(
  "userInfo/login",
  async (data: ILogin, { rejectWithValue }) => {
    try {
      const response = await userInfoServices.login(data);
		await storeToken(response.data.token);

		return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const register = createAsyncThunk(
  "userInfo/register",
  async (data: IRegister, { rejectWithValue }) => {
    try {
      const response = await userInfoServices.register(data);
		await storeToken(response.data.token);

		return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const removeFavoriteNumber = createAsyncThunk(
  "userInfo/removeFavoriteNumber",
  async (data: IPaginationRequest, { rejectWithValue }) => {
    try {
      const response = await userInfoServices.removeFavoriteNumber(data);

		return response.data;
    } catch (error: any) {
		console.log("error", error)
      return rejectWithValue(error.response.data);
    }
  },
);

export const getFavoriteNumbers = createAsyncThunk(
  "userInfo/getFavoriteNumbers",
  async (data: IPaginationRequest, { rejectWithValue }) => {
    try {
      const response = await userInfoServices.getFavoriteNumbers(data);
		return response.data;
    } catch (error: any) {
		console.log("error", error)
      return rejectWithValue(error.response.data);
    }
  },
);

export const clearHistory = createAsyncThunk(
  "userInfo/clearHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userInfoServices.clearHistory();

		return response.data;
    } catch (error: any) {
		console.log("error", error)
      return rejectWithValue(error.response.data);
    }
  },
);

export const getHistory = createAsyncThunk(
  "userInfo/getHistory",
  async (data: IPaginationRequest, { rejectWithValue }) => {
    try {
      const response = await userInfoServices.getHistory(data);
		return response.data;
    } catch (error: any) {
		console.log("error", error)
      return rejectWithValue(error.response.data);
    }
  },
);

export const getMyComments = createAsyncThunk(
  "userInfo/getMyComments",
  async (data: IPaginationRequest, { rejectWithValue }) => {
    try {
      const response = await userInfoServices.getMyComments(data);
		return response.data;
    } catch (error: any) {
		console.log("error", error)
      return rejectWithValue(error.response.data);
    }
  },
);