export interface loginDto {
	loginId: string;
	password: string;
}

export interface registerDto {
	loginId: string;
	password: string;
	nickname?: string;
	email?: string;
	// role: string;
}
