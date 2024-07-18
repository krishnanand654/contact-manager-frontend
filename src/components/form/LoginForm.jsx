import { useState } from "react"


const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })


    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        })
    }

    const validate = () => {
        const errors = {};
        if (!formData.email) errors.email = "Email required";
        if (!formData.password) errors.password = "Password required";
        return errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            // Submit form data
            setErrors({})
            console.log('Form submitted', formData);
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} />
                {errors && <p>{errors.email}</p>}
            </div>
            <div>
                <label>Password</label>
                <input name="password" type="password" value={formData.password} onChange={handleChange} />
                {errors && <p>{errors.password}</p>}
            </div>
            <button type="submit">Register</button>
        </form>
    )
}

export default LoginForm