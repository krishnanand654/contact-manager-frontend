import { Link } from "react-router-dom"
import { getRandomColor } from "../../../utils/randomColorGenerator"

const ListCard = ({ data = [] }) => {
    return (
        <>
            <div>
                {data.length > 0 ? data.map((contact, index) => {
                    const AvatarChar = contact.firstName.charAt(0).toLowerCase();
                    const color = getRandomColor(AvatarChar);

                    return (
                        <Link key={index} to={`/home/${contact._id}`}>
                            <div className="flex justify-between border-b p-4 items-center hover:bg-zinc-400/20 cursor-pointer rounded">
                                <div className="flex gap-2 flex-wrap  w-full text-sm">
                                    <div className={`w-10 h-10 rounded-[100%] ${color} relative top-[-1px] flex justify-center items-center text-white font-medium`}>
                                        <p>{contact.firstName.charAt(0)}</p>
                                    </div>
                                    <div>
                                        <h1 className="  font-medium w-40">{contact.firstName + " " + contact.lastName}</h1>
                                        <p className="text-sm w-40">{contact.company}</p>
                                    </div>
                                </div>
                                <p className="text-sm w-40">{contact.phoneNumbers[0]}</p>
                                <img className="" width="16" height="16" src="https://img.icons8.com/ios-glyphs/30/727272/chevron-right.png" alt="chevron-right" />
                            </div>
                        </Link>
                    )
                }) : <p className="p-4">No Contacts</p>}
            </div>
        </>
    )
}
export default ListCard