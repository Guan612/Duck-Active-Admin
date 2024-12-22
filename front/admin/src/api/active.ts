import type { createActiveDto } from "@/dto/activeDto";
import http from ".";

export function createActiveAPI(data: createActiveDto) {
    http.post("/active", data);
}