import http from ".";
export function getActiveListAPI() {
	return http.get("/active");
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