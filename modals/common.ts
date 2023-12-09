import { TypeDangerous } from "./allNumbersModal";

export interface ICommentCommon {
	id: number,
	comment: string,
	date: string,
	typeDangerous: TypeDangerous,
}

export interface IPaginationRequest {
	page?: number;
	pageSize?:number;
	number?: string;
}