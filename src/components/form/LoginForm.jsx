import { useState } from "react"
import { Input, Button } from "@nextui-org/react";
const LoginForm = ({ onSubmit, loading }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        })
    }

    const validate = () => {
        const errors = {};

        if (!formData.email) {
            errors.email = "Email required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Invalid email address";
        }
        if (!formData.password) errors.password = "Password required";
        return errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            setErrors({})
            onSubmit(formData)
            console.log('Form submitted', formData);
        } else {
            console.log(validationErrors)
            setErrors(validationErrors);
        }
    };





    return (
        <form onSubmit={handleSubmit}  >
            <div>
                <Input
                    placeholder="Email"
                    className="mt-4 w-64 sm:w-80"
                    variant="bordered" name="email"
                    value={formData.email}
                    onChange={handleChange}
                    color={errors ? "danger" : "default"}
                    isRequired />
                {errors && <p className="text-danger text-[12px]">{errors.email}</p>}
            </div>
            <div>

                <Input
                    placeholder="Password"
                    className="mt-4 w-64 sm:w-80"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    variant="bordered"
                    isRequired
                    color={errors ? "danger" : "default"} />

                {errors && <p className="text-danger text-[12px]">{errors.password}</p>}
            </div>
            <Button color="default" className="mt-4 bg-black text-white rounded-md w-64 sm:w-80" type="submit" isLoading={loading}>
                Login
            </Button>
        </form>
    )
}

export default LoginForm