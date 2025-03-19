import http from ".";
export function getActiveListAPI() {
	return http.get("/active");
}

export function getShowActiveListAPI() {
	return http.get("/active/showActive");
}

export function getActiveDetailAPI(id: string) {
	return http.get(`/active/${id}`);
}

export function checkActiveStatusAPI(id: string) {
	return http.get(`/active/checkActiveStatus/${id}`);
}

export function getNewActiveAPI() {
	return http.get("/active/newactive");
}

export function getActiveStatusAPI(statusArray: number[]) {
	return http.get("/active/findByStatus", {
		params: {
			status: statusArray.join(","), // 将数组转换为逗号分隔的字符串
		},
	});
}

export function getActiveByTypeAPI(typeArray: number[]) {
	return http.get("/active/findByType", {
		params: {
			type: typeArray.join(","),
		},
	});
}

export function getActiveByTimeAPI(dates: Date[]) {
	const [startDate, endDate] = dates;
	return http.get("/active/findByTime", {
		params: {
			startDate: startDate.toISOString(),
			endDate: endDate.toISOString(),
		},
	});
}

export function signInActiveAPI(id: number) {
	return http.get(`/active/signInActive/${id}`);
}
