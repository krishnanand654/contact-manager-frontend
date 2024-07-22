import RegistrationForm from "../../components/form/RegistrationForm"
import { register } from "../../api/authApi"
import { useState } from "react"
const Registration = () => {
    const [validationError, setValidationError] = useState([]);
    const [error, setError] = useState("");
    const handleRegister = async (formData) => {
        try {
            await register(formData);
            console.log("registration success")
        } catch (error) {
            if (error.response.status == 400) {
                setError(error.response.data.message)
            } else {
                setValidationError(error.response.data.errors)
            }
        }
    }
    return (
        <div><RegistrationForm handleRegister={handleRegister} error={validationError} />
            <p>{error}</p>
        </div>
    )
}

export default Registration