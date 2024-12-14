export interface createActiveDto {
	title: string;
	content?: string;
	activitieImgUrl?: string;
	activitieType: number;
	startDate: Date;
	endDate: Date;
	activitStatus: number;
	activeAddress?: string;
	activitiePeopleNum: number;
}

export interface updateActiveDto {
	id: number;
	title?: string;
	content?: string;
	activitieImgUrl?: string;
	activitieType?: number;
	startDate?: Date;
	endDate?: Date;
	activitStatus?: number;
	activeAddress?: string;
	activitiePeopleNum?: number;
}
