import { useState } from 'react';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
        gender: '',
        phoneNumber: '',
        address: '',
        profilePicture: null,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const validate = () => {
        const errors = {};
        if (!formData.firstName) errors.firstName = 'First Name is required';
        if (!formData.lastName) errors.lastName = 'Last Name is required';
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.password) errors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            // Submit form data
            console.log('Form submitted', formData);
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                {errors.firstName && <span>{errors.firstName}</span>}
            </div>
            <div>
                <label>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                {errors.lastName && <span>{errors.lastName}</span>}
            </div>
            <div>
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <span>{errors.email}</span>}
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                {errors.password && <span>{errors.password}</span>}
            </div>
            <div>
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
            </div>
            <div>
                <label>Date of Birth</label>
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
            </div>
            <div>
                <label>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div>
                <label>Phone Number</label>
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </div>
            <div>
                <label>Address</label>
                <textarea name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div>
                <label>Profile Picture</label>
                <input type="file" name="profilePicture" onChange={handleChange} />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;
