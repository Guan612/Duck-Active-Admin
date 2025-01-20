import http from ".";

export const getAllIntegralAPI = () => {
	return http.get("/integral");
};

export const updateIntegralAPI = (id: string) => {
	return http.patch(`/integral/${id}`);
};
