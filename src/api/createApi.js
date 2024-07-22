import axiosInstance from "../services/axiosIntance";

export const createContact = async (formData) => {
    const response = await axiosInstance.post("/contacts/create", formData)
    return response
}