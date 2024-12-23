import type { createActiveDto } from "@/dto/activeDto";
import http from ".";

export function createActiveAPI(data: createActiveDto) {
    return http.post("/active", data);
}