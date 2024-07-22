import { Button, Input } from "@nextui-org/react"
import { Pagination } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import { Desktop, Mobile } from '../../../components/responsive/Responsive';


const ContactTableWrapper = ({ children, page, setPage, searchValue, setSearchValue }) => {
    const nav = useNavigate();


    return (
        <div className="w-full">
            <div className=" ">
                <div className="border-b p-3  border-[#dfdfdf] flex justify-between items-center wrapper">
                    <div className="flex items-center flex-wrap justify-between w-full">
                        <div>
                            <h1 className="font-medium text-3xl">Contacts</h1>
                            <p className="text-[12px] mt-1  text-zinc-500">
                                All Contacts
                            </p>
                        </div>
                        <div>
                            <Input type="text" placeholder="Search contacts" className="mt-2 w-80" size="sm" classNames={{
                                label: "text-zinc-600",
                                inputWrapper: "bg-zinc-100 border border-zinc-200 rounded-lg h-10",
                            }}
                                value={searchValue}
                                onChange={(e) => { setSearchValue(e.target.value) }}
                            />
                        </div>

                        <div>
                            <Desktop>
                                <Button color="default" className="bg-black text-white" onClick={() => { nav('/create') }}>
                                    + Add New
                                </Button>
                            </Desktop>
                            <Mobile>
                                <Button color="primary" variant="flat" className="min-w-10 bg-0  text-4xl" onClick={() => { nav('/create') }}>
                                    +
                                </Button>
                            </Mobile>
                        </div>
                    </div>
                </div>
                <div className="h-[60vh]">
                    {children}
                </div>
            </div>
            <div className="mt-5 flex items-end  justify-center" >
                <Pagination size="sm" color="default" showControls total={10} page={page} onChange={(page) => setPage(page)} initialPage={1} />
            </div>
        </div>
    )
}

export default ContactTableWrapper