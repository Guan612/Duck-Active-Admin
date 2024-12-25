export interface createActiveDto {
	title: string;
	content?: string;
	activitieImgUrl?: string;
	activitieType: number;
	createdPeople:number;
	startDate: Date;
	endDate: Date;
	activitStatus?: number;
	activeAddress?: string;
	activitiePeopleNum: number;
}

export interface updateActiveDto {
	title?: string;
	content?: string;
	activitieImgUrl?: string;
	activitieType?: number;
	startDate?: Date;
	endDate?: Date;
	activitStatus?: number;
	activeAddress?: string;
	activitiePeopleNum?: number;
	createdPeople?:number;
}

export enum ActivitieStatus {
	//0：创建活动 1：审核活动 2：开始报名 3：报名结束 4：活动结束
	创建活动 = 0,
	审核活动 = 1,
	审核未通过 = 6,
	正在报名 = 2,
	报名结束 = 3,
	活动开始 = 4,
	活动结束 = 5,
}

