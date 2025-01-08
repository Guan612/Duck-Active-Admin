import http from ".";

export const getAllRegistrationsAPI = () => {
  return http.get("/registration");
};