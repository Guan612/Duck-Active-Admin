import http from ".";

export const getAllIntegralAPI = () => {
	return http.get("/integral");
};

export const addpointAPI = (id: string) => {
	return http.post(`/integral/addpoint/${id}`);
};
