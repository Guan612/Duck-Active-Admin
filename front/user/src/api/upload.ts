import http from ".";

export const uploadAvatarAPI = (file: File) => {
    const formData = new FormData();
    formData.append("file", file); // 'file' 是后端接收的字段名

    return http.post("/uploadfile/avter", formData, {
        headers: {
            "Content-Type": "multipart/form-data", // 确保 Axios 使用 multipart/form-data
        },
    });
};