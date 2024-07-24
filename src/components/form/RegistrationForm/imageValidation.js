export const imageValidation = (formData) => {
    const errors = {};
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
