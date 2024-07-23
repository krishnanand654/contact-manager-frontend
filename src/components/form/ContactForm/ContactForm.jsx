import { Input as NextUIInput, Button, Textarea } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { useSelector } from "react-redux";
import { validateContactForm } from "./contactFormValidation";

const ContactForm = ({ handleCreate, setPercent, setErrorState, serverErrors }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        company: "",
        phoneNumbers: [""],
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

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
                filledFields += data.phoneNumbers.filter(num => num).length;
            } else if (data[field]) {
                filledFields += 1;
            }
        });
        return (filledFields / (fields.length)) * 100;
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



    const handleSubmit = async () => {
        setLoading(true);
        // e.preventDefault();
        const validationErrors = validateContactForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            setErrors({});
            setErrorState(false);
            handleCreate(formData);
            setLoading(false)
            setPercent(16);
        } else {
            setLoading(false)
            setErrorState(true);
            setErrors(validationErrors);
        }
    };

    const updateState = useSelector(state => state.update.updateState)

    useEffect(() => {
        setFormData({
            firstName: "",
            lastName: "",
            address: "",
            company: "",
            phoneNumbers: [""],
        });
    }, [updateState])

    return (
        <Form onFinish={handleSubmit} className="mt-10">
            <div className="flex gap-10 flex-wrap">
                <div className="flex flex-col gap-5 w-full md:w-auto lg:w-96">
                    <Form.Item
                        validateStatus={errors.firstName ? 'error' : ''}
                        help={errors.firstName}
                    >
                        <NextUIInput
                            type="text"
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item
                        validateStatus={errors.lastName ? 'error' : ''}
                        help={errors.lastName}
                    >
                        <NextUIInput
                            label="Last Name"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item
                        validateStatus={errors.address ? 'error' : ''}
                        help={errors.address}
                    >
                        <Textarea
                            label="Address"
                            placeholder="Enter your address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </Form.Item>
                </div>
                <div className="flex flex-col gap-5 w-full md:w-auto lg:w-96">
                    <Form.Item
                        validateStatus={errors.company ? 'error' : ''}
                        help={errors.company}
                    >
                        <NextUIInput
                            type="text"
                            label="Company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                        />
                    </Form.Item>

                    <Form.List
                        name="phoneNumbers"
                        initialValue={formData.phoneNumbers}
                    >

                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Form.Item
                                        key={key}
                                        validateStatus={errors[`phoneNumbers${name}`] ? 'error' : errors[`phoneNumbers`] ? 'error' : ''}
                                        help={errors[`phoneNumbers${name}`]}
                                        required={false}
                                    >
                                        <Form.Item
                                            {...restField}
                                        // validateStatus={errors[`phoneNumbers${name}`] ? 'error' : errors[`phoneNumbers`] ? 'error' : ''}
                                        // help={errors[`phoneNumbers`]}
                                        >
                                            <NextUIInput
                                                label={`Phone Number ${name + 1}`}
                                                placeholder="Phone number"
                                                className="w-96"
                                                value={formData.phoneNumbers[name]}
                                                onChange={(e) => handlePhoneChange(name, e.target.value)}
                                            />
                                        </Form.Item>

                                        {fields.length > 1 && (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => remove(name)}
                                            />
                                        )}
                                    </Form.Item>
                                ))}
                                <p className="text-sm text-danger">{errors.phoneNumbers}</p>
                                {fields.length < 2 && (
                                    <Form.Item>
                                        <Button
                                            onClick={() => add()}
                                            variant="bordered"
                                            icon={<PlusOutlined />}
                                        >
                                            + Add Phone Number
                                        </Button>
                                    </Form.Item>
                                )}
                            </>
                        )}
                    </Form.List>
                </div>
            </div>
            <Form.Item>
                <Button type="submit" isLoading={loading}>
                    Add
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ContactForm;
