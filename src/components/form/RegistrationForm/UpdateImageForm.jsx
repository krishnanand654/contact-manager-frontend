
import { Input } from "@nextui-org/react";
import { useState, useEffect } from "react"
import { Button } from "@nextui-org/react";
import { imageValidation } from "./imageValidation";

const UpdateImageForm = ({ error = [], handleProfilePicUpdate }) => {
    const [formData, setFormData] = useState({
        profilePicture: null,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = imageValidation(formData);
        console.log(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            handleProfilePicUpdate(formData);
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
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
                <Input label="Profile Picture" variant="bordered" type="file" name="profilePicture" onChange={handleChange} />
                <div className="min-h-[20px]">
                    {errors.profilePicture && <span className='text-[12px] text-danger'>{errors.profilePicture}</span>}
                </div>
                <Button type="submit">submit</Button>
            </div>
        </form>
    )
}

export default UpdateImageForm