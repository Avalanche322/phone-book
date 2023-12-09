import { INumberCodesRequest } from "../modals/numberCodesModal";
import { httpCommon } from "./httpCommon";


const getNumberCodes = (data: INumberCodesRequest) => {
  return httpCommon.post('/number-codes', data);
};

const userInfoServices = {
 getNumberCodes
};

export default userInfoServices;