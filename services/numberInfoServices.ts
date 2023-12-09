import { IPaginationRequest } from "../modals/common";
import { ICommentRequest, ICommentsRequest } from "../modals/numberInfoModal";
import { httpCommon } from "./httpCommon";

const getNumberInfo = (number: string) => {
  return httpCommon.get(`/number-info/${number}`);
};

const addComment = (data: ICommentRequest) => {
  return httpCommon.post('/comment', data);
};

const getComments = (data: ICommentsRequest) => {
  return httpCommon.post('/all-comments', data);
};

const getComment = (id: number) => {
  return httpCommon.get(`/comment/${id}`);
};

const deleteComment = (data: {id: number} & IPaginationRequest) => {
	const {id, ...rest} = data;

  return httpCommon.delete(`/comment/${id}`, {data: rest});
};

const numberInfoServices = {
  getNumberInfo,
  addComment,
  getComments,
  deleteComment,
  getComment
};

export default numberInfoServices;