import type { createActiveDto, updateActiveDto } from "@/dto/activeDto";
import http from ".";

export function createActiveAPI(data: createActiveDto) {
	return http.post("/active", data);
}

export function getActiveListAPI() {
	return http.get("/active");
}

export function getActiveByCreatUser() {
    return http.get('/active/findByCreatUser');
}

export function updateActiveAPI(id: number, data: updateActiveDto) {
    return http.patch(`/active/${id}`, data);
}

export function deleteActiveAPI(id: number) {
	return http.delete(`/active/${id}`);
}
