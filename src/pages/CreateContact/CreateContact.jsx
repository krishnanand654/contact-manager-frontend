import { useState } from "react";
import { createContact } from "../../api/createApi";
import ContactForm from "../../components/form/ContactForm/ContactForm";
import { Progress } from "@nextui-org/react";
import { message } from 'antd';
import { useDispatch } from "react-redux";
import { toggleUpdateState } from "../../features/update/updateSlice";

const CreateContact = () => {
    const [percent, setPercent] = useState(16);
    const [messageApi, contextHolder] = message.useMessage();
    const [errorState, setErrorState] = useState(false);
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Contact added ',
        });
    };
    const error = (e) => {
        messageApi.open({
            type: 'error',
            content: e || 'Contact creation failed',
        });
    };

    const handleCreate = async (formData) => {
        try {
            const response = await createContact(formData);
            if (response) {
                success();
                dispatch(toggleUpdateState());
            }
        } catch (e) {
            error(e.response.data.message)
            setErrors(e.response.data.errors[0])
            console.log(e);
        }
    };
    return (
        <div className="relative m-4">
            {contextHolder}
            <Progress
                size="sm"
                color={errorState ? "danger" : "primary"}
                aria-label="Loading..."
                value={percent}
                className="fixed top-0 left-0 w-full z-50"
            />
            <h1 className="text-xl font-medium">Add New Contact</h1>
            <ContactForm handleCreate={handleCreate} setPercent={setPercent} setErrorState={setErrorState} serverErrors={errors} />
        </div>
    );
};

export default CreateContact;
