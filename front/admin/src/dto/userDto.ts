export interface loginDto {
	loginId: string;
	password: string;
}

export interface registerDto {
	loginId: string;
	password: string;
	nickname?: string;
	email?: string;
	headerimg?: string;
}

export enum userRole{
	学生 = 0,
	社团 = 1,
	老师 = 2,
	超级管理员 = 3,
}