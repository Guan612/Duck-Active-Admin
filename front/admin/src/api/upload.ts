import http from ".";

export const uploadImgAPI = (data: any) => {
    return http.post('/uploadfile/img',data)
}