// RegistrationForm.js
import { useState, useEffect } from 'react';
import { validateUserForm } from './registrationFormValidation';
import { Input, Button, Select, SelectItem } from '@nextui-org/react';
const RegistrationForm = ({ handleRegister, error }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
        gender: '',
        phoneNumber: '',
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateUserForm(formData);

        if (Object.keys(validationErrors).length === 0) {


            handleRegister(formData);
            setErrors({});
        } else {
            setErrors(validationErrors);
        }
    };




    useEffect(() => {
        if (error.length > 0) {
            setErrors(error);
        }
    }, [error, formData]);

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" >
            <div className='sm:flex  gap-4'>
                <div className='sm:w-64 w-80 flex flex-col gap-4'>
                    <div>
                        <Input label="First Name" isRequired variant="bordered" type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                        {errors.firstName && <span className='text-[12px] text-danger'>{errors.firstName}</span>}
                    </div>
                    <div>

                        <Input label="Last Name" isRequired variant="bordered" type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                        {errors.lastName && <span className='text-[12px] text-danger'>{errors.lastName}</span>}
                    </div>
                    <div>

                        <Input label="Email" isRequired variant="bordered" type="email" name="email" value={formData.email} onChange={handleChange} />
                        {errors.email && <span className='text-[12px] text-danger'>{errors.email}</span>}
                    </div>
                    <div>

                        <Input label="Password" isRequired variant="bordered" type="password" name="password" value={formData.password} onChange={handleChange} />
                        {errors.password && <span className='text-[12px] text-danger'>{errors.password}</span>}
                    </div>
                    <div>

                        <Input label="Confirm Password" isRequired variant="bordered" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                        {errors.confirmPassword && <span className='text-[12px] text-danger'>{errors.confirmPassword}</span>}
                    </div>
                    <div>

                        <Input label="Date of Birth" isRequired variant="bordered" type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                        {errors.dateOfBirth && <span className='text-[12px] text-danger'>{errors.dateOfBirth}</span>}
                    </div>
                    <div>
                        <Select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            variant='bordered'
                            isRequired
                            placeholder="Select Gender"
                            className="max-w-xs mb-5"
                            aria-label='gender'
                        >
                            <SelectItem key="">Select</SelectItem>
                            <SelectItem key="male">Male</SelectItem>
                            <SelectItem key="female">Female</SelectItem>
                            <SelectItem key="other">Other</SelectItem>
                        </Select>
                        {errors.gender && <span className='text-[12px] text-danger'>{errors.gender}</span>}
                    </div>

                </div>
                <div className='sm:w-64 w-80  flex flex-col gap-4'>
                    <div>

                        <Input label="Phone Number" isRequired variant="bordered" type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                        {errors.phoneNumber && <span className='text-[12px] text-danger'>{errors.phoneNumber}</span>}
                    </div>
                    <div>

                        <Input label="Street" isRequired variant="bordered" type="text" name="address.street" value={formData.address.street} onChange={handleChange} />
                        {errors['address.street'] && <span className='text-[12px] text-danger'>{errors['address.street']}</span>}
                    </div>
                    <div>

                        <Input label="City" isRequired variant="bordered" type="text" name="address.city" value={formData.address.city} onChange={handleChange} />
                        {errors['address.city'] && <span className='text-[12px] text-danger'>{errors['address.city']}</span>}
                    </div>
                    <div>

                        <Input label="State" isRequired variant="bordered" type="text" name="address.state" value={formData.address.state} onChange={handleChange} />
                        {errors['address.state'] && <span className='text-[12px] text-danger'>{errors['address.state']}</span>}
                    </div>
                    <div>

                        <Input label="Postal Code" isRequired variant="bordered" type="text" name="address.postalCode" value={formData.address.postalCode} onChange={handleChange} />
                        {errors['address.postalCode'] && <span className='text-[12px] text-danger'>{errors['address.postalCode']}</span>}
                    </div>
                    <div>

                        <Input label="Country" isRequired variant="bordered" type="text" name="address.country" value={formData.address.country} onChange={handleChange} />
                        {errors['address.country'] && <span className='text-[12px] text-danger'>{errors['address.country']}</span>}
                    </div>
                    <div>

                        <Input label="Profile Picture" variant="bordered" type="file" name="profilePicture" onChange={handleChange} />
                    </div>
                </div>
            </div>
            <Button isLoading={false} className='bg-black text-white mt-4 rounded-sm' type="submit">Register</Button>
        </form>
    );
};

export default RegistrationForm;
