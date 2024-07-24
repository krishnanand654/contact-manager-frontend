export const validateUserForm = (formData) => {
    const errors = {};
    console.log(formData)
    if (!formData.firstName) errors.firstName = 'First name is required';
    // if (!formData.lastName) errors.lastName = 'Last name is required';
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) errors.gender = 'Gender is required';
    if (!/^\d{10}$/.test(formData.phoneNumber)) errors.phoneNumber = 'Phone Number must be of length 10 and contain only digits';
    if (!formData.address.street) errors['address.street'] = 'Street address is required';
    if (!formData.address.city) errors['address.city'] = 'City is required';
    if (!formData.address.state) errors['address.state'] = 'State is required';
    if (!/^[0-9]+$/.test(formData.address.postalCode)) errors['address.postalCode'] = 'Postal code should be Numeric';
    if (!formData.address.postalCode) errors['address.postalCode'] = 'Postal code is required';
    if (!formData.address.country) errors['address.country'] = 'Country is required';
    if (formData.profilePicture) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(formData.profilePicture.type)) {
            errors.profilePicture = 'Profile picture must be a JPEG, PNG, or JPG image';
        }
    } else {
        delete errors.profilePicture;
    }

    return errors;
};
