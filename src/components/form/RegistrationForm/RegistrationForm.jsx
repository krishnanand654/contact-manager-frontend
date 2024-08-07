// RegistrationForm.js
import { useState, useEffect } from 'react';
import { validateUserForm } from './registrationFormValidation';
import { Input, Button, Select, SelectItem } from '@nextui-org/react';

const RegistrationForm = ({ handleRegister, error = [] }) => {
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
        console.log(validationErrors);
        if (Object.keys(validationErrors).length === 0) {


            handleRegister(formData);
            setErrors({});
        } else {
            setErrors(validationErrors);
        }
    };

    console.log(errors)



    useEffect(() => {
        if (error.length > 0) {
            setErrors(error);
        }
    }, [error, formData]);

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" >
            <div className=''>
                <div className=''>
                    <div>
                        <Input label="First Name" isRequired variant="bordered" type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                        <div className="min-h-[20px]">
                            {errors.firstName && <span className='text-[12px] text-danger'>{errors.firstName}</span>}
                        </div>
                    </div>
                    <div>

                        <Input label="Last Name" isRequired variant="bordered" type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                        <div className="min-h-[20px]">
                            {errors.lastName && <span className='text-[12px] text-danger'>{errors.lastName}</span>}
                        </div>
                    </div>
                    <div>

                        <Input label="Email" isRequired variant="bordered" name="email" value={formData.email} onChange={handleChange} />
                        <div className="min-h-[20px]">
                            {errors.email && <span className='text-[12px] text-danger'>{errors.email}</span>}
                        </div>
                    </div>
                    <div>

                        <Input label="Password" isRequired variant="bordered" type="password" name="password" value={formData.password} onChange={handleChange} />
                        <div className="min-h-[20px]">
                            {errors.password && <span className='text-[12px] text-danger'>{errors.password}</span>}
                        </div>
                    </div>
                    <div>
                        <Input label="Confirm Password" isRequired variant="bordered" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                        <div className="min-h-[20px]">
                            {errors.confirmPassword && <span className='text-[12px] text-danger'>{errors.confirmPassword}</span>}
                        </div>
                    </div>
                    <div>

                        <Input label="Date of Birth" isRequired variant="bordered" type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                        <div className="min-h-[20px]">
                            {errors.dateOfBirth && <span className='text-[12px] text-danger'>{errors.dateOfBirth}</span>}
                        </div>
                    </div>
                    <div>
                        <Select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            variant='bordered'
                            placeholder="Select Gender"
                            className=""
                            aria-label='gender'

                        >
                            <SelectItem key="">Select</SelectItem>
                            <SelectItem key="male">Male</SelectItem>
                            <SelectItem key="female">Female</SelectItem>
                            <SelectItem key="other">Other</SelectItem>
                        </Select>
                        <div className="min-h-[20px]">
                            {errors.gender && <span className='text-[12px] text-danger'>{errors.gender}</span>}
                        </div>
                    </div>

                </div>
                <div className=''>
                    <div>

                        <Input label="Phone Number" isRequired variant="bordered" type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                        <div className="min-h-[20px]">
                            {errors.phoneNumber && <span className='text-[12px] text-danger'>{errors.phoneNumber}</span>}
                        </div>
                    </div>
                    <div>

                        <Input label="Street" isRequired variant="bordered" type="text" name="address.street" value={formData.address.street} onChange={handleChange} />
                        <div className="min-h-[20px]">
                            {errors['address.street'] && <span className='text-[12px] text-danger'>{errors['address.street']}</span>}
                        </div>
                    </div>
                    <div>
                        <Input label="City" isRequired variant="bordered" type="text" name="address.city" value={formData.address.city} onChange={handleChange} />
                        <div className="min-h-[20px]">
                            {errors['address.city'] && <span className='text-[12px] text-danger'>{errors['address.city']}</span>}
                        </div>
                    </div>
                    <div>

                        <Input label="State" isRequired variant="bordered" type="text" name="address.state" value={formData.address.state} onChange={handleChange} />
                        <div className="min-h-[20px]">
                            {errors['address.state'] && <span className='text-[12px] text-danger'>{errors['address.state']}</span>}
                        </div>
                    </div>
                    <div>
                        <Input label="Postal Code" isRequired variant="bordered" type="text" name="address.postalCode" value={formData.address.postalCode} onChange={handleChange} />
                        <div className="min-h-[20px]">
                            {errors['address.postalCode'] && <span className='text-[12px] text-danger'>{errors['address.postalCode']}</span>}
                        </div>
                    </div>
                    <div>
                        <Input label="Country" isRequired variant="bordered" type="text" name="address.country" value={formData.address.country} onChange={handleChange} />
                        <div className="min-h-[20px]">
                            {errors['address.country'] && <span className='text-[12px] text-danger'>{errors['address.country']}</span>}
                        </div>
                    </div>
                    <div>
                        <Input label="Profile Picture" variant="bordered" type="file" name="profilePicture" onChange={handleChange} />
                        <div className="min-h-[20px]">
                            {errors.profilePicture && <span className='text-[12px] text-danger'>{errors.profilePicture}</span>}
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-5 mb-10 h-32'>
                <Button isLoading={false} className='bg-black text-white mt-4 w-full rounded-sm' type="submit">Register</Button>
            </div>
        </form>
    );
};

export default RegistrationForm;
