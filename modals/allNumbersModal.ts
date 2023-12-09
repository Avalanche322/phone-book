import { Pagination } from "./numberCodesModal"

export enum TypeDangerous {
	Default = -1,
	Safe = 0,
	Neutral = 1,
	Dangerous = 2
}

export enum ColorByTypeDangerous {
	Default = "transparent",
	Safe = "#4caf50",
	Neutral = "#2196f3",
	Dangerous = "#c62828"
}

export interface IAllNumbersRequest {
	page: number;
	typeSort?: TypeSort
}

export interface INumberRow {
	number: string, 
	level_dangerous: number,
	typeDangerous: TypeDangerous
}

export interface IAllNumbers {
	items: Array<INumberRow>,
	loading: boolean,
	error: string,
	pagination: Pagination,
	search: {
		items: Array<INumberRow>,
		loading: boolean,
		error: string,
	}
}

export enum TypeSort {
	Default = '-1',
	DescLevelDangerous= '0',
	AscLevelDangerous= '1',
	DescCountMarks= '2',
	AscCountMarks= '3',
}