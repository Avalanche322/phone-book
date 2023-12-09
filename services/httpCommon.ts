import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ip = "192.168.230.191"; 
// 192.168.55.191
// 192.168.1.104 - dometry
// 192.168.31.214 - home

const onRequestError = (error: AxiosError) => {
  Promise.reject(error);
};

const onRequest = async (config: InternalAxiosRequestConfig) => {
	const jwtToken = await AsyncStorage.getItem('jwtToken');
  if (jwtToken) {
    config.headers.Authorization = `Bearer ${jwtToken}`;
  }
  return config;
}

const httpCommon = axios.create({
  baseURL: `http://${ip}:5000`,
  headers: {
    "Content-type": "application/json",
  },
});

httpCommon.interceptors.request.use(onRequest, onRequestError);

export { httpCommon };
