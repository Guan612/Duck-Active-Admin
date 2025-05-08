import http from ".";

export const createIntegralAPI = (userId: number) => {
  return http.post("/integral", { userId });
};

export const getUserIntegralAPI = () => {
  return http.get("/integral/findByUser");
};
