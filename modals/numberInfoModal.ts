import { INumberRow, TypeDangerous } from "./allNumbersModal";
import { ICommentCommon, IPaginationRequest } from "./common";
import { Pagination } from "./numberCodesModal";

export interface INumber extends INumberRow {
	count_marks: number,
	last_date_mark: string,
	isFavoriteNum: boolean
}

export interface INumberInfo {
	info: {
		data: INumber
		loading: boolean,
		error: string,
	},
	comments: ICommentState,
}

export interface ICommentState {
	items: Array<ICommentNumberInfo>,
	loading: boolean,
	error: string,
	pagination: Pagination,
	filterSettings: {
		safeCount: number,
		dangerousCount: number,
		neutralCount: number,
	},
}


export interface ICommentNumberInfo extends ICommentCommon {
	 createdByUser: boolean,
}

export interface ICommentRequest {
	number: string,
	comment: string;
	typeDangerous: TypeDangerous
}

export interface ICommentsRequest extends IPaginationRequest {
	typeFilter: number
}