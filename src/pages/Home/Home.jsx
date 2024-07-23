import { useEffect, useState } from 'react';
import { fetchContact } from '../../api/fetchApi';
import { useParams } from 'react-router-dom';
import { Desktop, Mobile } from '../../components/responsive/Responsive';
import ContactCard from '../../components/ui/ContactCard/ContactCard';
import ListCard from '../../components/ui/ListCard/ListCard';
import ContactTableWrapper from '../../components/ui/ContactTableWrapper/ContactTableWrapper';
import { useSelector } from "react-redux";

export const Home = () => {
    const { id } = useParams();
    const [data, setData] = useState();
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const updateState = useSelector(state => state.update.updateState)

    useEffect(() => {
        if (searchValue) {
            const fetchData = async () => {
                try {
                    const response = await fetchContact();
                    setData(response.data);
                } catch (error) {
                    console.log(error)
                }
            };
            fetchData();
        } else {
            const fetchData = async () => {
                const response = await fetchContact(page);
                setData(response.data);
            };
            fetchData();
        }
    }, [searchValue, page, updateState]);
    const filteredData = data?.filter(contact => {
        const searchParts = searchValue.toLowerCase().split(' ');
        return searchParts.every(part =>
            contact.firstName.toLowerCase().includes(part) ||
            contact.lastName.toLowerCase().includes(part) ||
            contact.company.toLowerCase().includes(part)
        );
    });


    return (
        <div >
            <Desktop>
                <div className="flex">
                    <ContactTableWrapper
                        page={page}
                        setPage={setPage}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                    >
                        <ListCard data={filteredData} />
                    </ContactTableWrapper>
                    {id && <ContactCard id={id} />}
                </div>
            </Desktop>
            <Mobile>
                {id ? (
                    <ContactCard id={id} />
                ) : (
                    <ContactTableWrapper
                        page={page}
                        setPage={setPage}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                    >
                        <ListCard data={filteredData} />
                    </ContactTableWrapper>
                )}
            </Mobile>
        </div>
    );
};
