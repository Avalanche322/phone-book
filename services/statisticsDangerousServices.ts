import { httpCommon } from "./httpCommon";

const getStatisticsLevelDangerous = () => {
  return httpCommon.get('/statistics');
};

const statisticsDangerousServices = {
  getStatisticsLevelDangerous,
};

export default statisticsDangerousServices;