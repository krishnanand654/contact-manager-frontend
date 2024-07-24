import { Button } from "@nextui-org/react"
import { useSelector } from "react-redux"
import { UpdateRegistrationForm } from "../../components/form/RegistrationForm/UpdateRegistrationForm"
import { useState } from "react"
import { updateUser, fetchUser } from "../../api/userApi"
import { useDispatch } from "react-redux"
import { getUser } from "../../features/user/userSlice"
import { message } from 'antd';
import ImageUpdateModal from "../../components/ui/ImageUpdateModal/ImageUpdateModal"

const Profile = () => {
    const [toggleUpdateButton, setToggleUpdateButton] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const userData = useSelector(state => state.user.userData)
    const dispatch = useDispatch();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Profile Updated',
        });
    };

    const error = (e) => {
        messageApi.open({
            type: 'error',
            content: e || 'Contact creation failed',
        });
    };

    const handleUpdate = async (formData) => {
        setLoading(true);
        try {
            const response = await updateUser(formData);
            if (response) {
                success()
                await getUserData()
                setLoading(false);
                setToggleUpdateButton(false)
            }
        } catch (err) {
            error(err.response.data.message)
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const getUserData = async () => {
        try {
            const response = await fetchUser();
            const data = response.data;
            dispatch(getUser({ userData: data }));
        } catch (error) {
            console.log(error)
        }
    }

    // eslint-disable-next-line no-unused-vars
    const { profilePicture, ...userTextData } = userData;

    return (<>
        {contextHolder}
        <div className={`h-[90vh] ${!toggleUpdateButton ? 'bg-[#f6f6f6]' : 'bg-white'}`}>
            {userData &&
                <div className="sm:p-20 sm:pt-10 pt-10 p-5 bg-zinc-900 text-black  h-40 w-full relative">
                    <Button className="absolute top-5 right-5" size="sm" onClick={() => { setToggleUpdateButton(!toggleUpdateButton) }}>{toggleUpdateButton ? 'Cancel' : 'Edit'}</Button>
                    {!toggleUpdateButton ?
                        <div className="relative top-10 flex flex-col items-start  sm:items-start w-full ">
                            <img className="w-40 h-40 rounded-full " src={userData?.profilePicture ? `data:image/jpeg;base64,${userData.profilePicture?.data}` : null} />
                            <div className="relative top-[-50px] left-[120px]">
                                <ImageUpdateModal data={userData} />
                            </div>
                            <div className=" w-full">
                                <div className="flex gap-2 items-center">
                                    <h1 className="text-3xl mt-3 mb-3 font-bold ">{userData.firstName + " " + userData.lastName}.<span className="text-sm font-medium text-zinc-400"> You</span></h1>
                                    <div>
                                        {userData && userData.gender === 'male' ? <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/4191F5/male.png" alt="male" /> :
                                            userData.gender === 'female' ? <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/F2578D/female.png" alt="female" /> : <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/C757F2/gender.png" alt="gender" />}
                                    </div>
                                </div>
                                <div className="sm:flex gap-5">
                                    <div className="bg-white  mt-5 p-5 pt-2 pb-2 rounded-md w-full">
                                        <h1 className="text-sm">Email</h1>
                                        <p className="text-blue-500 text-sm">{userData.email} </p>
                                    </div>
                                    <div className="bg-white  mt-5 p-5 pt-2 pb-2 rounded-md w-full">
                                        <h1 className="text-sm">Phone</h1>
                                        <p className="text-blue-500 text-sm">{userData?.phoneNumber} </p>
                                    </div>
                                    <div className="bg-white  mt-5 p-5 pt-2 pb-2 rounded-md w-full">
                                        <h1 className="text-sm">Dob</h1>
                                        <p className="text-blue-500 text-sm">{userData?.dateOfBirth.split('T')[0]} </p>
                                    </div>
                                </div>
                                <div className="bg-white  mt-5 p-5 pt-2 pb-2 rounded w-full">
                                    <h1 className="text-sm mb-2 ">Address</h1>
                                    <div className="text-sm text-zinc-600">
                                        <p >{userData?.address?.street}, </p>
                                        <p>{userData?.address?.city}, </p>
                                        <p>{userData?.address?.postalCode}, </p>
                                        <p>{userData?.address?.state},</p>
                                        <p>{userData?.address?.country}</p>
                                    </div>
                                </div>
                            </div>
                        </div> : <div className="mt-10">
                            <h1 className="mb-16 text-3xl text-white font-medium min-w-64">Update {userData && userData.firstName + "'s"}  info</h1>
                            <UpdateRegistrationForm userData={userTextData} handleUpdate={handleUpdate} loading={loading} />
                        </div>
                    }
                </div>
            }</div>
    </>
    )
}

export default Profile