import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import { message } from "antd";
import { useEffect, useState } from "react";
import React from "react";

export default function CustomModal({ headerText, onSubmit, buttonName, size, children, success, fail, }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [messageApi, contextHolder] = message.useMessage();
    const [errors, setErrors] = useState([])

    const successMessage = () => {
        messageApi.open({
            type: 'success',
            content: 'Contact updated successfully',
        });
    };

    const errorMessage = (e) => {
        messageApi.open({
            type: 'error',
            content: e || "update failed",
        });
    };

    useEffect(() => {
        if (success) {
            successMessage();
            onClose()
        }
    }, [success,])

    useEffect(() => {
        if (fail) {
            errorMessage();
        }
    }, [fail,])

    const handleUpdate = async (formData) => {
        try {
            await onSubmit(formData)
        } catch (err) {
            setErrors(err.response?.data?.errors || []);
        }
    }


    return (
        <>
            {contextHolder}
            <div className="flex flex-wrap gap-3">
                <Button size="sm" className="min-w-[5px] text-[12px]" variant="flat" color="primary" onClick={onOpen}>
                    <img width="16" height="16" src="https://img.icons8.com/fluency-systems-filled/48/245DAB/create-new.png" alt="create-new" />
                    {buttonName}
                </Button>
            </div>
            <Modal
                backdrop="blur"
                size={size}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1">{headerText}</ModalHeader>
                        <ModalBody>
                            {React.cloneElement(children, { handleUpdate, errors })}
                        </ModalBody>
                    </>
                </ModalContent>
            </Modal>
        </>
    );
}
