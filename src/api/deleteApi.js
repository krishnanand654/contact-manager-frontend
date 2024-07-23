import axiosInstance from "../services/axiosIntance"

export const deleteContact = (id) => {
    try {
        const response = axiosInstance.delete(`/contacts/delete/${id}`)
        return response;
    } catch (e) {
        console.log(e);
    }

}