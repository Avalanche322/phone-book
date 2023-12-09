import { IAllNumbersRequest } from "../modals/allNumbersModal";
import { httpCommon } from "./httpCommon";

const getAllNumbers = (data: IAllNumbersRequest) => {
  return httpCommon.post('/all-numbers', data);
};

const searchNumber = (number: string) => {
  return httpCommon.get(`/number-search/${number}`);
};

const allNumbersServices = {
  getAllNumbers,
  searchNumber
};

export default allNumbersServices;