import { ICommentCommon } from "./common";

export interface IUser {
	email: string,
	username: string,
	loading: boolean,
	error: string,
}

export interface ILogin {
	email: string,
	password: string
}

export interface IRegister extends ILogin {
	username: string
}

export interface IFavoriteHistoryNumber{
	id: number;
	number: string;
	date: string;
}

export interface ICommentHistory extends ICommentCommon {
	 number: string,
}