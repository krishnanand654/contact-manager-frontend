export const validateUserForm = (formData) => {
    const errors = {};

    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    const emailPattern = /\S+@\S+\.\S+/;
    if (!formData.email || !emailPattern.test(formData.email)) errors.email = 'Email is invalid';
    if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters long';
    if (!/[A-Z]/.test(formData.password)) errors.password = 'Password must contain at least one uppercase letter';
    if (!/[0-9]/.test(formData.password)) errors.password = 'Password must contain at least one number';
    if (!/[\W]/.test(formData.password)) errors.password = 'Password must contain at least one special character';
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) errors.gender = 'Gender is required';
    if (!/^\d{10}$/.test(formData.phoneNumber)) errors.phoneNumber = 'Phone Number must be of length 10 and contain only digits';
    if (!formData.address.street) errors['address.street'] = 'Street address is required';
    if (!formData.address.city) errors['address.city'] = 'City is required';
    if (!formData.address.state) errors['address.state'] = 'State is required';
    if (!/^[0-9]+$/.test(formData.address.postalCode)) errors['address.postalCode'] = 'Postal code should be Numeric';
    if (!formData.address.postalCode) errors['address.postalCode'] = 'Postal code is required';
    if (!formData.address.country) errors['address.country'] = 'Country is required';

    return errors;
};
