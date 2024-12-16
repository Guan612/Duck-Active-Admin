import http from ".";
export function getActiveListAPI() {
	return http.get("/active");
}

export function getActiveDetailAPI(id: string) {
	return http.get(`/active/${id}`);
}
