export interface Pagination {
	totalPage: number,
	totalCount: number,
}

export interface INumberCode {
	id: number, title: string, code: string
}

export interface INumberCodes {
	items: Array<INumberCode>,
	loading: boolean,
	error: string,
	pagination: Pagination
}

export interface INumberCodesRequest {
	search?: string,
	page?: number
}

export interface INumberCodesResponse {
	items: Array<INumberCode>,
	pagination: Pagination
}