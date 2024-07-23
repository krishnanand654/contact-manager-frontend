import { Input, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Textarea } from "@nextui-org/react";
import { validateContactForm } from "./ContactForm/contactFormValidation";

const UpdateForm = ({ contactData, handleUpdateForm, serverErrors }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        company: "",
        phoneNumbers: ["", ""],
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (contactData) {
            setFormData(contactData);
        }

    }, [contactData]);

    useEffect(() => {
        if (serverErrors) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                ...serverErrors
            }));
        }
    }, [serverErrors]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const newData = { ...prevData, [name]: value };
            return newData;
        });
    };

    const handlePhoneChange = (index, value) => {
        const newPhoneNumbers = [...formData.phoneNumbers];
        newPhoneNumbers[index] = value;
        setFormData((prevData) => {
            const newData = { ...prevData, phoneNumbers: newPhoneNumbers };

            return newData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateContactForm(formData);

        if (Object.keys(validationErrors).length === 0) {
            handleUpdateForm(formData)
            setErrors({});
        } else {
            setErrors(validationErrors);

        }
    };


    return (
        <form onSubmit={handleSubmit} >
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

                    </div>
                    {errors.phoneNumbers && <span className="text-danger text-sm mt-1">{errors.phoneNumbers}</span>}
                    {errors.phoneNumbers1 && <span className="text-danger text-sm mt-1">{errors.phoneNumbers1}</span>}
                </div>

            </div>
            <Button className="mt-3 mb-3" color="primary" variant="flat" type="submit">Update</Button>
        </form>
    );
};

export default UpdateForm;
