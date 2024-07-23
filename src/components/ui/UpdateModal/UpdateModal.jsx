import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import UpdateForm from "../../form/UpdateForm";
import { message } from "antd";
import { updateContact } from "../../../api/updateApi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleUpdateState } from "../../../features/update/updateSlice";

export default function UpdateModal({ data }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [messageApi, contextHolder] = message.useMessage();
    const [errors, setErrors] = useState([])

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Contact updated successfully',
        });
    };

    const error = (e) => {
        messageApi.open({
            type: 'error',
            content: e || "update failed",
        });
    };

    const dispatch = useDispatch();


    const handleUpdateForm = async (formData) => {
        try {
            const response = await updateContact(data._id, formData);
            console.log(response.data);
            success();
            setErrors({})
            dispatch(toggleUpdateState());
            onClose();
        } catch (e) {
            error(e.response.data.message);
            setErrors(e.response.data.errors[0])
            console.log(e);
        }
    };

    return (
        <>
            {contextHolder}
            <div className="flex flex-wrap gap-3">
                <Button size="sm" className="min-w-[5px] text-[12px]" variant="flat" color="primary" onClick={onOpen}>
                    <img width="16" height="16" src="https://img.icons8.com/fluency-systems-filled/48/245DAB/create-new.png" alt="create-new" />
                    Edit
                </Button>
            </div>
            <Modal
                backdrop="blur"
                size="4xl"
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1">Update Contact</ModalHeader>
                        <ModalBody>
                            <UpdateForm contactData={data} handleUpdateForm={handleUpdateForm} serverErrors={errors} />
                        </ModalBody>
                    </>
                </ModalContent>
            </Modal>
        </>
    );
}
