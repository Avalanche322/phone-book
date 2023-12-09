
export interface IStaticsDangerous {
	dangerous: number;
	neutral: number;
	safe: number;
}

export interface IStats {
	stats: IStaticsDangerous
	loading: boolean,
	error: string,
}