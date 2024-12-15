import http from ".";
export function getActiveListAPI() {
	return http.get("/active");
}

export function getActiveDetailAPI(id: string) {
	return http.get(`/active/${id}`);
}

export function isJoinAPI(id: string) {
	return http.get("/active/isjoin/", { params: { activeId:id } });
}

export function addActiveAPI(data: object) {
	return http.post("/active/join", data);
}
