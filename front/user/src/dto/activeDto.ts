export interface ActiveDto {
	id: number;
	title: string;
	content?: string;
	activitieType: ActivitieType;
	startDate: Date;
	endDate: Date;
	activeAddress: string;
	activitStatus: ActivitieStatus;
	activitieImgUrl?: string;
	activitiePeopleNum: number;
}

export enum ActivitieType {
	//0：博学 1：笃行 2：尽美 3：明德
	通用 = 0,
	博学 = 1,
	笃行 = 2,
	尽美 = 3,
	明德 = 4,
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
