import type { createActiveDto, updateActiveDto } from "@/dto/activeDto";
import http from ".";

export function createActiveAPI(data: createActiveDto) {
	return http.post("/active", data);
}

export function getActiveListAPI() {
	return http.get("/active");
}

export function getActiveDetailAPI(id: string) {
	return http.get(`/active/${id}`);
}

export function getActiveByCreatUserAPI() {
	return http.get("/active/findByCreatUser");
}

export function getActiceByActiveIdAPI(id: number) {
	return http.get(`/active/findByActiveId/${id}`);
}

export function getActiveStatusAPI(statusArray: number[]) {
	return http.get("/active/findByStatus", {
		params: {
			status: statusArray.join(","), // 将数组转换为逗号分隔的字符串
		},
	});
}

export function updateActiveAPI(id: number, data: updateActiveDto) {
	return http.patch(`/active/${id}`, data);
}

export function deleteActiveAPI(id: number) {
	return http.delete(`/active/${id}`);
}
