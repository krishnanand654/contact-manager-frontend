import { Input, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Textarea } from "@nextui-org/react";

const ContactForm = ({ handleCreate, setPercent, setErrorState, serverErrors }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        company: "",
        phoneNumbers: ["", ""],
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (serverErrors) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                ...serverErrors
            }));
        }
    }, [serverErrors]);


    const calculateProgress = (data) => {
        const fields = ["firstName", "lastName", "address", "company", "phoneNumbers"];
        let filledFields = 0;
        fields.forEach((field) => {
            if (field === "phoneNumbers") {
                if (data.phoneNumbers[0] && data.phoneNumbers[1]) {
                    filledFields += 2;
                }
            } else if (data[field]) {
                filledFields += 1;
            }
        });
        return (filledFields / (fields.length + 1)) * 100;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const newData = { ...prevData, [name]: value };
            setPercent(calculateProgress(newData));
            return newData;
        });
    };

    const handlePhoneChange = (index, value) => {
        const newPhoneNumbers = [...formData.phoneNumbers];
        newPhoneNumbers[index] = value;
        setFormData((prevData) => {
            const newData = { ...prevData, phoneNumbers: newPhoneNumbers };
            setPercent(calculateProgress(newData));
            return newData;
        });
    };

    const validate = () => {
        const errors = {};
        if (!formData.firstName) errors.firstName = "First name is required";
        if (!formData.lastName) errors.lastName = "Last name is required";
        if (!formData.address) errors.address = "Address is required";
        if (!formData.company) errors.company = "Company is required";
        if (!formData.phoneNumbers || formData.phoneNumbers.length === 0 || !formData.phoneNumbers[0]) {
            errors.phoneNumbers0 = "Phone number 1 is required";
        } else {
            if (typeof formData.phoneNumbers[0] !== 'string' || !/^\d{10}$/.test(formData.phoneNumbers[0])) {
                errors.phoneNumbers0 = "Phone number 1 must be 10 non-negative digits";
            }
            for (let i = 1; i < formData.phoneNumbers.length; i++) {
                if (formData.phoneNumbers[i] && (typeof formData.phoneNumbers[i] !== 'string' || !/^\d{10}$/.test(formData.phoneNumbers[i]))) {
                    errors[`phoneNumbers${i}`] = `Phone number ${i + 1} must be 10 non-negative digits`;
                }
            }
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            setErrors({});
            setErrorState(false);
            handleCreate(formData);
            setFormData({
                firstName: "",
                lastName: "",
                address: "",
                company: "",
                phoneNumbers: ["", ""],
            });
            setPercent(16)
        } else {
            setErrorState(true);
            setErrors(validationErrors);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-10">
            <div className="flex gap-10 flex-wrap">
                <div className="flex flex-col gap-5 w-full md:w-auto lg:w-96">
                    <div>
                        <Input
                            className=""
                            label="First Name"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        {errors.firstName && <span className="text-danger text-sm mt-1">{errors.firstName}</span>}
                    </div>
                    <div>
                        <Input
                            label="Last Name"
                            className=""
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        {errors.lastName && <span className="text-danger text-sm mt-1">{errors.lastName}</span>}
                    </div>
                    <div>
                        <Textarea
                            label="Address"
                            placeholder="Enter your address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                        {errors.address && <span className="text-danger text-sm mt-1">{errors.address}</span>}
                    </div>
                </div>
                <div className="flex flex-col gap-5 w-full md:w-auto lg:w-96">
                    <div>
                        <Input
                            label="Company"
                            className=""
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                        />
                        {errors.company && <span className="text-danger text-sm mt-1">{errors.company}</span>}
                    </div>
                    <div>
                        <Input
                            label="Phone Number 1"
                            className=""
                            type="text"
                            name="phoneNumber1"
                            value={formData.phoneNumbers[0]}
                            onChange={(e) => handlePhoneChange(0, e.target.value)}
                        />
                        {errors.phoneNumbers0 && <span className="text-danger text-sm mt-1">{errors.phoneNumbers0}</span>}
                    </div>
                    <div>
                        <Input
                            label="Phone Number 2"
                            className=""
                            type="text"
                            name="phoneNumber2"
                            value={formData.phoneNumbers[1]}
                            onChange={(e) => handlePhoneChange(1, e.target.value)}
                        />
                        {errors.phoneNumbers1 && <span className="text-danger text-sm mt-1">{errors.phoneNumbers1}</span>}
                    </div>
                </div>
                {errors.phoneNumbers && <span className="text-danger text-sm mt-1">{errors.phoneNumbers}</span>}
            </div>
            <Button className="mt-5" type="submit">Submit</Button>
        </form>
    );
};

export default ContactForm;
