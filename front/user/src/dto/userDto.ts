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
	// role: string;
}

export interface UserInfo {
  id: string;
  loginId: string;
  nickname?: string;
  email?: string;
  headerimg?: string;
  role?: number;
  token: string;
}

export interface updateUserDto {
  password?: string;
  email?: string;
  nickname?: string;
  role?: number;
  headerimg?: string;
}
