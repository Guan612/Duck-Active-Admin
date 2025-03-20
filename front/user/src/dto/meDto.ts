export interface myActiveDto {
	id: number;
    status:number;
	createdAt: Date;
	updatedAt: Date;
	userId: number;
	activitie: {
		id: number;
		title: string;
		activitStatus: number;
		activeAddress: string;
	};
}
