import axiosInstance from "../services/axiosIntance";

export const fetchContact = async (page) => {
    let response = null;
    if (page) {
        response = await axiosInstance.get(`/contacts?page=${page}`)
    } else {
        response = await axiosInstance.get(`/contacts`)
    }
    return response;
}

export const fetchContactById = async (id) => {
    const response = await axiosInstance.get(`/contacts/${id}`)
    return response
}