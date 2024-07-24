import RegistrationForm from "../../components/form/RegistrationForm/RegistrationForm"
import { register } from "../../api/authApi"
import { useState } from "react"
import { notification, Space } from 'antd';

const Registration = ({ onSuccess }) => {
    const [validationError, setValidationError] = useState([]);
    const [error, setError] = useState("");
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type) => {
        api[type]({
            message: 'Registration Failed',
            description: error
        });
    };

    const handleRegister = async (formData) => {
        try {
            const response = await register(formData);
            if (response.status === 201) {
                onSuccess();
            }
        } catch (error) {
            console.log(error);
            if (error.response.status == 400) {
                setError(error.response.data.message || error.response.data.error)
                openNotificationWithIcon('error')
            } else {
                setValidationError(error.response.data.errors[0])
            }
        }
    }
    return (
        <>
            {contextHolder}
            <Space>
                <div><RegistrationForm handleRegister={handleRegister} error={validationError} />

                </div>
            </Space>

        </>
    )
}

export default Registration