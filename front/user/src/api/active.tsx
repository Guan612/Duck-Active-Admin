import http from ".";
export function getActiveListAPI() {
	return http.get("/active");
}
