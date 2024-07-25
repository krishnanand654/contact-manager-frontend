export const validateContactForm = (formData) => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "First name is required";
    // if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.address) errors.address = "Address is required";
    if (!formData.company) errors.company = "Company is required";

    if (!formData.phoneNumbers.length || !formData.phoneNumbers[0]) {
        errors.phoneNumbers = "Phone Number 1 is required";
    } else {
        const phoneSet = new Set();
        formData.phoneNumbers.forEach((num, i) => {
            if (num && (typeof num !== 'string' || !/^\d{10}$/.test(num))) {
                errors[`phoneNumbers${i}`] = `Phone number ${i + 1} must be 10 non-negative digits`;
            }
            if (num && phoneSet.has(num)) {
                errors[`phoneNumbers${i}`] = `Phone number ${i + 1} is a duplicate`;
            }
            phoneSet.add(num);
        });
    }
    return errors;
};