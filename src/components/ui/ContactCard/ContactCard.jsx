import { useEffect, useState } from "react";
import { fetchContactById } from "../../../api/fetchApi";
import { useNavigate } from "react-router-dom";
import UpdateModal from "../UpdateModal/UpdateModal.jsx";
import { Skeleton } from "@nextui-org/react";
import { getRandomColor } from "../../../utils/randomColorGenerator.js";

const ContactCard = ({ id }) => {
    const [data, setData] = useState(null);
    const [updateTriggered, setUpdateTriggered] = useState(false);
    const [color, setColor] = useState("");
    const nav = useNavigate();

    useEffect(() => {
        const fetchById = async (id) => {
            try {
                const response = await fetchContactById(id);
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchById(id);
    }, [id, updateTriggered]);


    useEffect(() => {
        if (data) {
            const AvatarChar = data.firstName.charAt(0).toLowerCase();
            setColor(getRandomColor(AvatarChar));
        }
    }, [data, getRandomColor])

    const handleUpdate = () => {
        setUpdateTriggered(prev => !prev);
    };




    return (
        <div className="lg:w-[60%] h-[90vh] sm:w-full p-5 border-l">
            {data != null ? (<>
                <div className="flex justify-between">

                    <div className={`w-20 h-20 rounded-[100%] ${color} relative top-[-1px] flex justify-center items-center text-white font-medium`}>
                        <p className="text-3xl">{data.firstName.charAt(0)}</p>
                    </div>
                    <div className="cursor-pointer" onClick={() => { nav('/home'); }} size="sm"><img width="28" height="28" src="https://img.icons8.com/ios-glyphs/30/B3B3B3/cancel.png" alt="cancel" /></div>
                </div>
                <div className="border-b mb-8 pb-2">
                    {data.firstName && data.lastName ?
                        <h1 className="text-3xl font-medium mt-2">{data.firstName + " " + data.lastName}</h1> :
                        <Skeleton className="h-3 w-3/5 rounded-lg" />}
                    {data.company ?
                        <p className="text-zinc-600 pb-3">{data.company}</p> : <Skeleton className="h-3 mt-3 w-3/5 rounded-lg" />}
                    <UpdateModal data={data} onUpdate={handleUpdate} />
                </div>
                <div className="bg-zinc-300/30 p-4 pt-2 rounded-md">
                    <h1 className="text-sm font-medium mb-2">Mobile</h1>
                    {data.phoneNumbers && data.phoneNumbers.map((phone, index) => (
                        <p className="text-sm text-blue-600 cursor-pointer mb-1 hover:text-blue-800" key={index}>
                            {phone}
                        </p>
                    ))}
                </div>
                <div className="bg-zinc-300/30 mt-3 p-4 pt-2 rounded-md">
                    <h1 className="text-sm font-medium mb-2">Address</h1>
                    <p className="text-sm">{data.address}</p>
                </div>
            </>
            ) : (

                <div className="lg:w-[60%] h-[90vh] sm:w-full p-5 border-l flex flex-col items-center justify-center">
                    <Skeleton className="h-12 w-12 rounded-full mb-4" />
                    <Skeleton className="h-6 w-3/5 rounded-lg mb-4" />
                    <Skeleton className="h-4 w-3/5 rounded-lg mb-2" />
                    <Skeleton className="h-4 w-3/5 rounded-lg mb-2" />
                </div>

            )}
        </div>
    );
};

export default ContactCard;
