export const validateLoginForm = (formData) => {
    const errors = {};

    if (!formData.email) {
        errors.email = "Email required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = "Invalid email address";
    }
    if (!formData.password) errors.password = "Password required";
    return errors;
}