import { AxiosRequestConfig } from "axios";
import { IPaginationRequest } from "../modals/common";
import { ILogin, IRegister } from "../modals/userInfoModal";
import { httpCommon } from "./httpCommon";

const getUserInfo = () => {
  return httpCommon.get('/user');
};

const login = (data: ILogin) => {
  return httpCommon.post('/login', data);
};

const register = (data: IRegister) => {
  return httpCommon.post('/register', data);
};

const addFavoriteNumber = (data: {number: string}) => {
  return httpCommon.post('/favorite-numbers', data);
};

const removeFavoriteNumber = (data: IPaginationRequest) => {
	const {number, ...rest} = data;
  return httpCommon.delete(`/favorite-numbers/${number}`, {data: rest});
};

const getFavoriteNumbers = (data: IPaginationRequest) => {
  return httpCommon.post('/all-favorite-numbers', data);
};

const addNumberHistory = (number: string) => {
  return httpCommon.post(`/history/${number}`);
};

const clearHistory = () => {
  return httpCommon.delete('/history',);
};

const getHistory = (data: IPaginationRequest) => {
  return httpCommon.post('/all-history', data);
};

const getMyComments = (data: IPaginationRequest) => {
  return httpCommon.post('/my-comments', data);
};

const userInfoServices = {
  getUserInfo,
  login,
  register,
  addFavoriteNumber,
  removeFavoriteNumber,
  getFavoriteNumbers,
  addNumberHistory,
  clearHistory,
  getHistory,
  getMyComments
};

export default userInfoServices;