import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import UpdateImageForm from "../../form/RegistrationForm/UpdateImageForm";
import { message } from "antd";
import { updateUser } from "../../../api/userApi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../../api/userApi";
import { getUser } from "../../../features/user/userSlice";

export default function ImageUpdateModal() {
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


    const handleProfilePicUpdate = async (formData) => {
        try {
            console.log(formData)
            const response = await updateUser(formData);
            console.log(response.data)
            if (response) {
                success();
                onClose();
                await getUserData()
            }
        } catch (err) {
            onClose();
            error(err.response.data.message)
            setErrors(err.response.data.message)
        }
    };

    const getUserData = async () => {
        try {
            const response = await fetchUser();
            const data = response.data;
            dispatch(getUser({ userData: data }));
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            {contextHolder}
            <div className="flex flex-wrap gap-3">
                <Button size="sm" className="min-w-[5px] text-[12px]" color="default" onClick={onOpen}>
                    <img width="16" height="16" src="https://img.icons8.com/fluency-systems-filled/48/245DAB/create-new.png" alt="create-new" />
                </Button>
            </div>
            <Modal
                backdrop="blur"
                size="sm"
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1">Update profile image</ModalHeader>
                        <ModalBody>
                            <UpdateImageForm handleProfilePicUpdate={handleProfilePicUpdate} serverErrors={errors} />
                        </ModalBody>
                    </>
                </ModalContent>
            </Modal>
        </>
    );
}
