import { useState, useEffect } from 'react';

const RegistrationForm = ({ handleRegister, error }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
        gender: '',
        phoneNumbers: [''],
        address: {
            street: '',
            city: '',
            state: '',
            postalCode: '',
            country: ''
        },
        profilePicture: null,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        const [field, subfield] = name.split('.');
        console.log(files)
        if (subfield) {
            setFormData({
                ...formData,
                [field]: {
                    ...formData[field],
                    [subfield]: value,
                },
            });
        } else if (name === 'phoneNumbers') {
            setFormData({
                ...formData,
                phoneNumbers: [value],
            });
        } else {
            setFormData({
                ...formData,
                [name]: files ? files[0] : value,
            });
        }
    };

    const validate = () => {
        const validationErrors = {};
        if (!formData.firstName) validationErrors.firstName = 'First Name is required';
        if (!formData.lastName) validationErrors.lastName = 'Last Name is required';
        if (!formData.email) validationErrors.email = 'Email is required';
        if (!formData.password) validationErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) validationErrors.confirmPassword = 'Passwords do not match';
        if (!formData.dateOfBirth) validationErrors.dateOfBirth = 'Date of Birth is required';
        if (!formData.gender) validationErrors.gender = 'Gender is required';
        if (!formData.phoneNumbers[0]) validationErrors.phoneNumbers = 'Phone Number is required';
        if (!formData.address.street) validationErrors.street = 'Street is required';
        if (!formData.address.city) validationErrors.city = 'City is required';
        if (!formData.address.state) validationErrors.state = 'State is required';
        if (!formData.address.postalCode) validationErrors.postalCode = 'Postal Code is required';
        if (!formData.address.country) validationErrors.country = 'Country is required';
        return validationErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            setErrors({})
            handleRegister(formData);
        } else {
            setErrors(validationErrors);
        }
    };

    useEffect(() => {
        if (error.length > 0) {
            const serverErrors = {};
            error.forEach((err) => {
                serverErrors[err.field] = err.message;
            });
            setErrors((prevErrors) => ({
                ...prevErrors,
                ...serverErrors,
            }));
        }
    }, [error]);

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
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
                {errors.dateOfBirth && <span>{errors.dateOfBirth}</span>}
            </div>
            <div>
                <label>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                {errors.gender && <span>{errors.gender}</span>}
            </div>
            <div>
                <label>Phone Number</label>
                <input type="tel" name="phoneNumbers" value={formData.phoneNumbers[0]} onChange={handleChange} />
                {errors.phoneNumbers && <span>{errors.phoneNumbers}</span>}
            </div>
            <div>
                <label>Street</label>
                <input type="text" name="address.street" value={formData.address.street} onChange={handleChange} />
                {errors.street && <span>{errors.street}</span>}
            </div>
            <div>
                <label>City</label>
                <input type="text" name="address.city" value={formData.address.city} onChange={handleChange} />
                {errors.city && <span>{errors.city}</span>}
            </div>
            <div>
                <label>State</label>
                <input type="text" name="address.state" value={formData.address.state} onChange={handleChange} />
                {errors.state && <span>{errors.state}</span>}
            </div>
            <div>
                <label>Postal Code</label>
                <input type="text" name="address.postalCode" value={formData.address.postalCode} onChange={handleChange} />
                {errors.postalCode && <span>{errors.postalCode}</span>}
            </div>
            <div>
                <label>Country</label>
                <input type="text" name="address.country" value={formData.address.country} onChange={handleChange} />
                {errors.country && <span>{errors.country}</span>}
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
