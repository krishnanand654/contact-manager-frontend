import { Button } from "@nextui-org/react"
import { useSelector } from "react-redux"
import useAuth from "../../hooks/useAuth"

const Profile = () => {
    const userData = useSelector(state => state.user.userData)
    const { handleLogout } = useAuth();



    return (
        <div className="bg-[#f6f6f6] h-[90vh]">
            {userData &&

                <div className="sm:p-20 sm:pt-10 pt-10 p-5 bg-zinc-900 text-black  h-40 w-full">
                    <div className="relative top-10 flex flex-col items-start  sm:items-start w-full ">

                        <img className="w-40 h-40 rounded-full " src={userData?.profilePicture ? `data:image/jpeg;base64,${userData.profilePicture?.data}` : null} />
                        <div className=" w-full">
                            <div className="">
                                <h1 className="text-3xl mt-3 mb-3 font-bold ">{userData.firstName + " " + userData.lastName}.<span className="text-sm font-medium text-zinc-400"> You</span></h1>
                                {/* <Button color="default" size="sm">Edit</Button>
                                 */}
                                <Button color="default" size="sm" className="ml-2" onClick={() => { handleLogout() }}>Logout</Button>
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
                    </div>
                </div>

            }</div>
    )
}

export default Profile