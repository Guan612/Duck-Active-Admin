import http from ".";

export function isJoinAPI(id: string) {
	return http.get("/registration/isJoin", { params: { activeId: id } });
}

export function addActiveAPI(data: object) {
	return http.post("/registration/join", data);
}
