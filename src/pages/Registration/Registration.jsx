import RegistrationForm from "../../components/form/RegistrationForm/RegistrationForm"
import { register } from "../../api/authApi"
import { useState } from "react"

const Registration = ({ onSuccess }) => {
    const [validationError, setValidationError] = useState([]);
    const [error, setError] = useState("");
    const handleRegister = async (formData) => {
        try {

            const response = await register(formData);
            if (response != undefined) {
                onSuccess();
            }

        } catch (error) {
            console.log(error)
            if (error.response.status == 400) {
                setError(error.response.data.message || error.response.data.error)
            } else {
                setValidationError(error.response.data.errors[0])
            }
        }
    }
    return (
        <div><RegistrationForm handleRegister={handleRegister} error={validationError} />
            <p className="mt-2 text-[12px] text-danger">{error}</p>
        </div>
    )
}

export default Registration