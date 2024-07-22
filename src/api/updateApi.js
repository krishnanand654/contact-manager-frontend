import axiosInstance from "../services/axiosIntance"

export const updateContact = (id, formData) => {
    try {
        const response = axiosInstance.put(`/contacts/update/${id}`, formData)
        return response;
    } catch (e) {
        console.log(e);
    }

}